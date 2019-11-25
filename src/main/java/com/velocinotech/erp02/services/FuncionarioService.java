package com.velocinotech.erp02.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.velocinotech.erp02.domain.Funcionario;
import com.velocinotech.erp02.domain.UsuarioPeriodoEventual;
import com.velocinotech.erp02.domain.UsuarioPeriodoSuspenso;
import com.velocinotech.erp02.domain.UsuarioPeriodoTrabalho;
import com.velocinotech.erp02.repositories.FuncionarioRepository;
import com.velocinotech.erp02.repositories.UsuarioPeriodoEventualRepository;
import com.velocinotech.erp02.repositories.UsuarioPeriodoSuspensoRepository;
import com.velocinotech.erp02.repositories.UsuarioPeriodoTrabalhoRepository;
import com.velocinotech.erp02.services.exceptions.ObjectNotFoundException;


@Service
public class FuncionarioService {

	@Autowired
	private FuncionarioRepository repo;
	
	@Autowired
	private UsuarioPeriodoTrabalhoRepository usupertrabalhoRepository;

	@Autowired
	private UsuarioPeriodoEventualRepository usupereventualRepository;
	
	@Autowired
	private UsuarioPeriodoSuspensoRepository usupersuspensoRepository;
	
	public Funcionario find(Integer id) {
		Funcionario obj = repo.findOne(id);
		if (obj == null) {
			throw new ObjectNotFoundException(
					"Objeto não encontrado! Id: " + id + ", Tipo: " + Funcionario.class.getName());
		}
		return obj;
	}

	
	@Transactional
	public Funcionario insert(Funcionario obj) {
 		
		obj = repo.save(obj);
	       
		for (UsuarioPeriodoTrabalho usupertrab : obj.getUsuarioperiodosdetrabalho()) {	
			usupertrab.setFuncionario(obj);	
		}
		usupertrabalhoRepository.save(obj.getUsuarioperiodosdetrabalho());
		
		for (UsuarioPeriodoEventual usupereventual : obj.getUsuarioperiodoeventual()) {	
			usupereventual.setFuncionario(obj);	
		}
		usupereventualRepository.save(obj.getUsuarioperiodoeventual());	
		
		for (UsuarioPeriodoSuspenso usupersuspenso : obj.getUsuarioperiodosuspenso()) {	
			usupersuspenso.setFuncionario(obj);	
		}
		usupersuspensoRepository.save(obj.getUsuarioperiodosuspenso());	
		
		
		return obj;
	}
				
}