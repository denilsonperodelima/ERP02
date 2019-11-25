package com.velocinotech.erp02.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.velocinotech.erp02.domain.Subgrupoitem;
import com.velocinotech.erp02.repositories.SubgrupoitemRepository;
import com.velocinotech.erp02.resources.utils.Micelaneas;


@Service
public class SubgrupoitemService {

	@Autowired
	private SubgrupoitemRepository repo;
	@Autowired
	private Micelaneas micelaneas;
	
	@Transactional
	public void  delete(Integer id) {	
		Subgrupoitem objget = repo.findOne(id);
		objget.setDtexclui(micelaneas.dataDoDia());
		repo.save(objget);
	}	
}