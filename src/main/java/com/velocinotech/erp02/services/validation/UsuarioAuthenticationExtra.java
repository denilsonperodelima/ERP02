package com.velocinotech.erp02.services.validation;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.velocinotech.erp02.domain.Empresa;
import com.velocinotech.erp02.domain.Funcionario;
import com.velocinotech.erp02.domain.Usuario;
import com.velocinotech.erp02.domain.UsuarioPeriodoEventual;
import com.velocinotech.erp02.domain.UsuarioPeriodoSuspenso;
import com.velocinotech.erp02.domain.UsuarioPeriodoTrabalho;
import com.velocinotech.erp02.repositories.EmpresaRepository;
import com.velocinotech.erp02.repositories.FuncionarioRepository;
import com.velocinotech.erp02.repositories.UsuarioRepository;
import com.velocinotech.erp02.resources.utils.Micelaneas;

@Component
public class UsuarioAuthenticationExtra {
	
	@Autowired
	private UsuarioRepository repo;

	@Autowired
	private EmpresaRepository empresarepository;

	@Autowired
	private FuncionarioRepository funcionariorepository;
	
	@Autowired
	private Micelaneas micelaneas;
	
	public String usuarioTemAcesso(String email, Integer idempresa, Integer idpessoa) {
		
		Date datadia = micelaneas.dataDoDia();
		String codigoret = "000";
		String mensagem = "Validação de perído de trabalho realizada com sucesso !!!";
		
		//---------------------------------------		
		//validar empresa
		//---------------------------------------
		Empresa empresa = empresarepository.findOne(idempresa);	
        if ( !(empresa.getStatus().toUpperCase().trim().equals("ATIVA")) ) {
			    codigoret = "999";
				mensagem = ("Empresa desativada - status: " + empresa.getStatus().toUpperCase() );  
				return(mensagemtoToJson(codigoret, mensagem));
        };
		
		//---------------------------------------		
		//validar usuário
		//---------------------------------------
		Usuario usuario = repo.findByEmail(email);

		GregorianCalendar cal = new GregorianCalendar();
		cal.setTime(micelaneas.dataDoDia());			
		int diasemana =  cal.get(Calendar.DAY_OF_WEEK);
		 int horadia = cal.get(Calendar.HOUR_OF_DAY);
		  
		if(!(usuario.getStatus().toUpperCase().trim().equals("ATIVO") )) {
		    codigoret = "999";
			mensagem = "Usuario suspenso - STATUS = " + usuario.getStatus().toUpperCase();    
			return(mensagemtoToJson(codigoret, mensagem));			
	    }
		
		if(usuario.getDataexpira() != null) {
			
	       if ( (usuario.getDataexpira().getTime() - datadia.getTime()) / 1000/60/60/24  < 0) {
			    codigoret = "999";
				mensagem = ("Usuario com validade expirada - data de expiração: " + usuario.getDataexpira() );   
				mensagem = ("Empresa desativada - status: " + empresa.getStatus() );  
				return(mensagemtoToJson(codigoret, mensagem));					
	       };			
		}
        
		Funcionario funcionario = funcionariorepository.findOne(idpessoa);	
		if (funcionario != null) {   
			for (UsuarioPeriodoSuspenso usupersuspenso : funcionario.getUsuarioperiodosuspenso()) {	
				
				if ((micelaneas.dataAtualEstaNoPeriodo(usupersuspenso.getDatainicio(), usupersuspenso.getDatafim()))) {
				    codigoret = "999";
					mensagem = ("Usuario em periodo suspenso - período: " + usupersuspenso.getDatainicio() + " até " + usupersuspenso.getDatafim());    	   				  
					return(mensagemtoToJson(codigoret, mensagem));	
				}			
			}
			
			for (UsuarioPeriodoEventual usupereventual : funcionario.getUsuarioperiodoeventual()) {				
				if ((micelaneas.dataAtualEstaNoPeriodo(usupereventual.getDatainicio(), usupereventual.getDatafim()))) {
					if (((horadia > usupereventual.getHorainicio()) && (horadia < usupereventual.getHorafim()))) {
						return(mensagemtoToJson(codigoret, mensagem));					}				
				}
			}
			
			for (UsuarioPeriodoTrabalho usuper : funcionario.getUsuarioperiodosdetrabalho()) {	
				if(diasemana == usuper.getDiadasemana()) {
					if (!((horadia > usuper.getHorainicio()) && (horadia < usuper.getHorafim()))) {
					    codigoret = "999";
						mensagem = ("Usuario não tem permissão de acesso neste horário - horário permitido: " + usuper.getHorainicio() + " até " + usuper.getHorafim());    	   				
						return(mensagemtoToJson(codigoret, mensagem));	
					}
				}			
			}			

		}
		return(mensagemtoToJson(codigoret, mensagem));			
	};
	public String mensagemtoToJson(String codigo, String mensagem) {

		ObjectMapper mapper = new ObjectMapper();
		ObjectNode root = mapper.createObjectNode();
		root.put("ret", 1);
		ObjectNode child = root.putObject("retorno");
		child.put("codret", codigo);
		child.put("mensagem", mensagem);
		
		return root.toString();		
	}
}
