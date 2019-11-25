package com.velocinotech.erp02.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.velocinotech.erp02.domain.Banco;
import com.velocinotech.erp02.domain.Contato;
import com.velocinotech.erp02.domain.Contatotipo;
import com.velocinotech.erp02.domain.Endereco;
import com.velocinotech.erp02.domain.Funcionario;
import com.velocinotech.erp02.domain.Pessoa;
import com.velocinotech.erp02.domain.Usuario;
import com.velocinotech.erp02.domain.UsuarioPeriodoEventual;
import com.velocinotech.erp02.domain.UsuarioPeriodoSuspenso;
import com.velocinotech.erp02.domain.UsuarioPeriodoTrabalho;
import com.velocinotech.erp02.repositories.BancoRepository;
import com.velocinotech.erp02.repositories.ContatoRepository;
import com.velocinotech.erp02.repositories.ContatotipoRepository;
import com.velocinotech.erp02.repositories.EnderecoRepository;
import com.velocinotech.erp02.repositories.PessoaRepository;
import com.velocinotech.erp02.repositories.UsuarioPeriodoEventualRepository;
import com.velocinotech.erp02.repositories.UsuarioPeriodoSuspensoRepository;
import com.velocinotech.erp02.repositories.UsuarioPeriodoTrabalhoRepository;
import com.velocinotech.erp02.repositories.UsuarioRepository;
import com.velocinotech.erp02.resources.utils.Micelaneas;
import com.velocinotech.erp02.resources.utils.SenhaInicial;
import com.velocinotech.erp02.services.exceptions.ObjectNotFoundException;


@Service
public class PessoaService {

	@Autowired
	private PessoaRepository repo;

	@Autowired
	private Micelaneas micelaneas;
	
	@Autowired
	private EnderecoRepository enderecoRepository;
	
	@Autowired
	private ContatoRepository contatoRepository;

	@Autowired
	private ContatotipoRepository contatotipoRepository;
	
	@Autowired
	private BancoRepository bancoRepository;
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private UsuarioPeriodoTrabalhoRepository usupertrabalhoRepository;

	@Autowired
	private UsuarioPeriodoEventualRepository usupereventualRepository;
	
	@Autowired
	private UsuarioPeriodoSuspensoRepository usupersuspensoRepository;

	@Autowired
	private SenhaInicial senhainicial;
	
	//@Autowired
	//private EmailService emailService;
	
	@Autowired
	private BCryptPasswordEncoder pe;
	
	public List<Pessoa> findAll() {
		List<Pessoa> obj = repo.findAll();		
		return obj;
	}
	
	public Pessoa find(Integer id) {
		Pessoa obj = repo.findOne(id);
		if (obj == null) {
			throw new ObjectNotFoundException(
					"Objeto não encontrado! Id: " + id + ", Tipo: " + Pessoa.class.getName());
		}
		return obj;
	}

	public void deleteLogic(Pessoa obj) {
		
		Pessoa objget = repo.findOne(obj.getId());
		if (objget == null) {
			throw new ObjectNotFoundException(
					"Objeto não encontrado! Id: " + obj.getId() + ", Tipo: " + Usuario.class.getName());
		}
		
		obj.setDtexclui(micelaneas.dataDoDia());
		repo.save(obj);
		
	}	
	
    @Transactional
	public Pessoa insert(Pessoa obj) {

		
		if(obj.getId() == null) {
			obj.setDtinclui(micelaneas.dataDoDia());
			obj.setDtaltera(null);
		} else {
			obj.setDtaltera(micelaneas.dataDoDia());
			
		}
		

	    obj.setEmpresaid(obj.getEmpresa().getId());	     

		repo.save(obj);
    	
		for (Endereco enderecos : obj.getEnderecos()) {	
			enderecos.setPessoa(obj);	
		}
		enderecoRepository.save(obj.getEnderecos());
		
		for (Contato  contatos : obj.getContatos()) {	
			contatos.setPessoa(obj);	
			
    		for (Contatotipo  contatostipo : contatos.getContatostipo()) {	
    			contatostipo.setcontato(contatos);	
    		}
    	    contatotipoRepository.save(contatos.getContatostipo());         		
		}	
	    contatoRepository.save(obj.getContatos());  

		for (Banco bancos : obj.getBancos()) {	
			bancos.setPessoa(obj);	
		}
		bancoRepository.save(obj.getBancos());
		
		for (Usuario usuario : obj.getUsuarios()) {	

			usuario.setPessoa(obj);	
			
			String novasenha = senhainicial.getSenhaInicial();
			
			usuario.setSenha(pe.encode(novasenha));
	        
		    //emailService.sendNewPasswordEmail(usuario, novasenha);

		}
		usuarioRepository.save(obj.getUsuarios());      		
		
		if (obj instanceof Funcionario) {
			for (UsuarioPeriodoEventual usupereventual : ((Funcionario) obj).getUsuarioperiodoeventual()) {	
				usupereventual.setFuncionario((Funcionario) obj);	
			}
			usupereventualRepository.save(((Funcionario) obj).getUsuarioperiodoeventual());	
			
			for (UsuarioPeriodoSuspenso usupersuspenso : ((Funcionario) obj).getUsuarioperiodosuspenso()) {	
				usupersuspenso.setFuncionario((Funcionario) obj);	
			}
			usupersuspensoRepository.save(((Funcionario) obj).getUsuarioperiodosuspenso());	   
			
			for (UsuarioPeriodoTrabalho usupertrab : ((Funcionario) obj).getUsuarioperiodosdetrabalho()) {	
				usupertrab.setFuncionario((Funcionario) obj);	
			}
			usupertrabalhoRepository.save(((Funcionario) obj).getUsuarioperiodosdetrabalho());    
		}
    		
		return obj;
	}

	public Pessoa alterausuario(Pessoa obj) {
	    
	    obj.setDtaltera(micelaneas.dataDoDia());   			
	    
	    obj.setEmpresaid(obj.getEmpresa().getId());	     

	    repo.save(obj);

	    System.out.println("saiu salvar " );	
	    
		for (Usuario usuario : obj.getUsuarios()) {	
			Usuario usuariosv = usuarioRepository.findOne(usuario.getId());
			usuarioRepository.delete(usuario.getId());
			usuario.setId(null);
			usuario.setPessoa(obj);	
			usuario.setSenha(usuariosv.getSenha());
		}
		usuarioRepository.save(obj.getUsuarios());      		
    		
		return obj;
	}
	public List<Pessoa> FindNomeLike(Integer idempresa,String tiporelacionamento, String nome) {
		List<Pessoa> obj = repo.FindNomeLike(idempresa,tiporelacionamento, nome);		
		return obj;
	}

	public List<Pessoa> findByDocumento(Integer idempresa, String tiporelacionamento, String documento) {

		String novodoc = documento.replace("+","/").replace("x",".");
		//System.out.println("novo documento " + novodoc);		
		List<Pessoa> pessoas = repo.FindByDocumento(idempresa,tiporelacionamento, novodoc);
		return pessoas;
	}
}