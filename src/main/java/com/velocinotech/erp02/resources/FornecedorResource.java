package com.velocinotech.erp02.resources;



import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.velocinotech.erp02.domain.Fornecedor;
import com.velocinotech.erp02.dto.FornecedorDTO;
import com.velocinotech.erp02.services.FornecedorService;

@RestController
@RequestMapping(value="/fornecedor")
public class FornecedorResource {

	@Autowired
	private FornecedorService service;		
	
	/*
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<List<Fornecedor>> findAll() {
		List<Fornecedor> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
    */
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<List<FornecedorDTO>> findAll() {
		List<Fornecedor> list = service.findAll(); //apesar de estar com findAll ele respeita,
	                                             // e acessa somente as tabelas definidas no PessoaDTO
	List<FornecedorDTO> listDto = list.stream().map(obj -> new FornecedorDTO(obj)).collect(Collectors.toList());  

	return ResponseEntity.ok().body(listDto);
	}

	
	@RequestMapping(value="/{id}",method=RequestMethod.GET)
	public ResponseEntity<?> find(@PathVariable Integer id) {
		Fornecedor obj = service.find(id);
		
		FornecedorDTO objDto = new FornecedorDTO(obj); 
		
		return ResponseEntity.ok().body(objDto);
	}
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<?> insert(@Valid @RequestBody Fornecedor obj) {		
		obj = service.insert(obj);
		return ResponseEntity.ok().body(obj);
	}
}
