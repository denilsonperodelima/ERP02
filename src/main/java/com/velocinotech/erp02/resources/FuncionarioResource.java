package com.velocinotech.erp02.resources;



import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.velocinotech.erp02.domain.Funcionario;
import com.velocinotech.erp02.dto.FuncionarioDTO;
import com.velocinotech.erp02.services.FuncionarioService;

@RestController
@RequestMapping(value="/funcionario")
public class FuncionarioResource {

@Autowired
	private FuncionarioService service;

@PreAuthorize("hasRole('PAGINAFUNCIONARIOLEITURA') or hasRole('SUPER') or hasRole('ADMIN') or hasRole('PAGINAFUNCIONARIO')")
	@RequestMapping(value="/{id}",method=RequestMethod.GET)
	public ResponseEntity<?> find(@PathVariable Integer id) {
		Funcionario obj = service.find(id);
		FuncionarioDTO objdto = new  FuncionarioDTO(obj);
		return ResponseEntity.ok().body(objdto);
	}
@PreAuthorize("hasRole('SUPER') or hasRole('ADMIN') or hasRole('PAGINAFUNCIONARIO')")
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<?> insert(@Valid @RequestBody Funcionario obj) {
		obj = service.insert(obj);
		
		return ResponseEntity.ok().body(obj);
	}
		
}
