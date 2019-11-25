package com.velocinotech.erp02.resources;



import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.velocinotech.erp02.domain.Vendedor;
import com.velocinotech.erp02.dto.VendedorProdutoDTO;
import com.velocinotech.erp02.services.VendedorService;

@RestController
@RequestMapping(value="/vendedor")
public class VendedorResource {

	@Autowired
	private VendedorService service;		
	
	/*
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<List<Vendedor>> findAll() {
		List<Vendedor> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
    */
	
	@RequestMapping(value="/{id}",method=RequestMethod.GET)
	public ResponseEntity<?> find(@PathVariable Integer id) {
		Vendedor obj = service.find(id);
		return ResponseEntity.ok().body(obj);
	}
	@RequestMapping(value="/produtos/{id}",method=RequestMethod.GET)
	public ResponseEntity<?> produtos(@PathVariable Integer id) {
		Vendedor obj = service.find(id);
		VendedorProdutoDTO vendedorDTO = new VendedorProdutoDTO(obj);
		return ResponseEntity.ok().body(vendedorDTO);
	}
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<?> insert(@Valid @RequestBody Vendedor obj) {		
		obj = service.insert(obj);
		return ResponseEntity.ok().body(obj);
	}
}
