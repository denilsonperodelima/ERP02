package com.velocinotech.erp02.resources;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.velocinotech.erp02.domain.ItemPedido;
import com.velocinotech.erp02.services.ItemPedidoService;


@RestController
@RequestMapping(value="/itempedido")
public class ItemPedidoResource {

	@Autowired
	private ItemPedidoService service;
	
	@RequestMapping(value="/{id}",method=RequestMethod.GET)
	public ResponseEntity<?> find(@PathVariable Integer id) {
		ItemPedido obj = service.find(id);
		return ResponseEntity.ok().body(obj);
	}
	//@PreAuthorize("hasRole('ADMIN') or hasRole('SUPER')")
	@RequestMapping(value="/delete/{id}", method=RequestMethod.POST)
	public ResponseEntity<Void> delete(@PathVariable Integer id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}		
}

