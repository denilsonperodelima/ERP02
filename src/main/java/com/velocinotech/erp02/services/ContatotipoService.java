package com.velocinotech.erp02.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.velocinotech.erp02.repositories.ContatotipoRepository;


@Service
public class ContatotipoService {
	
	@Autowired
	private ContatotipoRepository repo;

	public void delete(Integer id) {
			repo.delete(id);
	}
}