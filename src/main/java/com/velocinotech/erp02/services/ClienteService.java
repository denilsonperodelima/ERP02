package com.velocinotech.erp02.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.velocinotech.erp02.domain.Cliente;
import com.velocinotech.erp02.repositories.ClienteRepository;
import com.velocinotech.erp02.services.exceptions.ObjectNotFoundException;

@Service
public class ClienteService {
	
	@Autowired
	private ClienteRepository repo;
	
	public Cliente find(Integer id) {
		
		Cliente obj = repo.findOne(id);
		if (obj == null) {
			throw new ObjectNotFoundException(
					"Objeto não encontrado! Id: " + id + ", Tipo: " + Cliente.class.getName());
		}
		return obj;
	}
	
	public List<Cliente> findAll() {
		return repo.findAll();
	}
	
	@Transactional
	public Cliente insert(Cliente obj) {
		repo.save(obj);
		return obj;
	}
}