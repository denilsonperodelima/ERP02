package com.velocinotech.erp02.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.velocinotech.erp02.domain.ItemPedido;
import com.velocinotech.erp02.domain.Produto;
import com.velocinotech.erp02.repositories.ItemPedidoRepository;
import com.velocinotech.erp02.services.exceptions.ObjectNotFoundException;

@Service
public class ItemPedidoService {
	
	@Autowired
	private ItemPedidoRepository repo;
	
	public ItemPedido find(Integer id) {		
		ItemPedido obj = repo.findOne(id);
		if (obj == null) {
			throw new ObjectNotFoundException(
					"Objeto não encontrado! Id: " + id + ", Tipo: " + Produto.class.getName());
		}
		return obj;
	}

	public void delete(Integer id) {
		repo.delete(id);
}
}