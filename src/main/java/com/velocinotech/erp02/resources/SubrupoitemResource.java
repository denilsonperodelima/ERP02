package com.velocinotech.erp02.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.velocinotech.erp02.services.SubgrupoitemService;

@RestController
@RequestMapping(value="/subgrupoitem")
public class SubrupoitemResource {

	@Autowired
	private SubgrupoitemService service;

	@PreAuthorize("hasRole('SUPER') or hasRole('ADMIN')")
	@RequestMapping(value="/delete/{id}",method=RequestMethod.POST)
	public ResponseEntity<String> delete(@PathVariable Integer id)  {		
		service.delete(id);  		
		return ResponseEntity.ok().body("Operação realizada com sucesso !!!");
	}

}
