package com.velocinotech.erp02.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.velocinotech.erp02.domain.Tabela;
import com.velocinotech.erp02.domain.Usuario;
import com.velocinotech.erp02.repositories.TabelaRepository;
import com.velocinotech.erp02.resources.utils.Micelaneas;
import com.velocinotech.erp02.services.exceptions.ObjectNotFoundException;


@Service
public class TabelaService {

	@Autowired
	private TabelaRepository repo;
	
	@Autowired
	private Micelaneas micelaneas;
	
	public List<Tabela> getGrupo(Integer idTabela, String grupo) {
		List<Tabela> obj = repo.getGrupo(idTabela, grupo);		
		return obj;
	}
	
	@Transactional
	public Tabela insert(Tabela obj) {		
		obj = repo.save(obj); 			    		
		return obj;
	}
	public Tabela find(Integer id) {
		Tabela obj = repo.findOne(id);
		if (obj == null) {
			throw new ObjectNotFoundException(
					"Objeto não encontrado! Id: " + id + ", Tipo: " + Tabela.class.getName());
		}
		return obj;
	}	
	
	public void deleteLogic(Tabela obj) {
		
		Tabela objget = repo.findOne(obj.getId());
		if (objget == null) {
			throw new ObjectNotFoundException(
					"Objeto não encontrado! Id: " + obj.getId() + ", Tipo: " + Usuario.class.getName());
		}
		
		obj.setDtexclui(micelaneas.dataDoDia());
		repo.save(obj);
		
	}
	public void returnDeleteLogic(Tabela obj) {
		
		Tabela objget = repo.findOne(obj.getId());
		if (objget == null) {
			throw new ObjectNotFoundException(
					"Objeto não encontrado! Id: " + obj.getId() + ", Tipo: " + Usuario.class.getName());
		}
		
		obj.setDtexclui(null);
		repo.save(obj);
		
	}

	public List<Tabela> getSomenteGrupos(Integer idempresa) {
		List<Tabela> obj = repo.getSomenteGrupos(idempresa);		
		return obj;
	}	
}