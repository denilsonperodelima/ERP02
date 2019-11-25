package com.velocinotech.erp02.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.velocinotech.erp02.domain.Fornecedor;
import com.velocinotech.erp02.repositories.FornecedorRepository;
import com.velocinotech.erp02.services.exceptions.ObjectNotFoundException;

@Service
public class FornecedorService {
	
	@Autowired
	private FornecedorRepository repo;
	
	public Fornecedor find(Integer id) {
		
		Fornecedor obj = repo.findOne(id);
		if (obj == null) {
			throw new ObjectNotFoundException(
					"Objeto não encontrado! Id: " + id + ", Tipo: " + Fornecedor.class.getName());
		}
		return obj;
	}
	
	public List<Fornecedor> findAll() {
		return repo.findAll();
	}
	
	@Transactional
	public Fornecedor insert(Fornecedor obj) {
		repo.save(obj);
		return obj;
	}
}