package com.velocinotech.erp02.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.velocinotech.erp02.domain.Vendedor;
import com.velocinotech.erp02.repositories.VendedorRepository;
import com.velocinotech.erp02.services.exceptions.ObjectNotFoundException;

@Service
public class VendedorService {
	
	@Autowired
	private VendedorRepository repo;
	
	public Vendedor find(Integer id) {
		
		Vendedor obj = repo.findOne(id);
		if (obj == null) {
			throw new ObjectNotFoundException(
					"Objeto não encontrado! Id: " + id + ", Tipo: " + Vendedor.class.getName());
		}
		return obj;
	}
	
	public List<Vendedor> findAll() {
		return repo.findAll();
	}
	
	@Transactional
	public Vendedor insert(Vendedor obj) {
		repo.save(obj);
		return obj;
	}
}