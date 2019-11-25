package com.velocinotech.erp02.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.velocinotech.erp02.domain.Subgrupo;
import com.velocinotech.erp02.services.SubgrupoService;

@RestController
@RequestMapping(value="/subgrupo")
public class SubgrupoResource {

	@Autowired
	private SubgrupoService service;
	
	@PreAuthorize("hasRole('USUARIOSIS') or hasRole('SUPER') or hasRole('ADMIN')")	
	@RequestMapping(value="/{id}",method=RequestMethod.GET)
	public ResponseEntity<?> find(@PathVariable Integer id) {
		Subgrupo obj = service.find(id);
		return ResponseEntity.ok().body(obj);
	}		
}
