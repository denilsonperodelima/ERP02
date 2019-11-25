package com.velocinotech.erp02.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.velocinotech.erp02.domain.Subgrupo;
import com.velocinotech.erp02.repositories.SubgrupoRepository;
import com.velocinotech.erp02.services.exceptions.ObjectNotFoundException;


@Service
public class SubgrupoService {

	@Autowired
	private SubgrupoRepository repo;
	
	public Subgrupo find(Integer id) {
		Subgrupo obj = repo.findOne(id);
		if (obj == null) {
			throw new ObjectNotFoundException(
					"Objeto não encontrado! Id: " + id + ", Tipo: " + Subgrupo.class.getName());
		}
		return obj;
	}	
	
}