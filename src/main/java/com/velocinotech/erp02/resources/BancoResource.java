package com.velocinotech.erp02.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.velocinotech.erp02.services.BancoService;

@RestController
@RequestMapping(value="/banco")
public class BancoResource {

	@Autowired
	private BancoService service;

	//@PreAuthorize("hasRole('ADMIN') or hasRole('SUPER')")
	@RequestMapping(value="/delete/{id}", method=RequestMethod.POST)
	public ResponseEntity<Void> delete(@PathVariable Integer id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}		
}
