package com.velocinotech.erp02.resources;



import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.velocinotech.erp02.domain.Cliente;
import com.velocinotech.erp02.dto.ClienteDTO;
import com.velocinotech.erp02.services.ClienteService;

@RestController
@RequestMapping(value="/cliente")
public class ClienteResource {

	@Autowired
	private ClienteService service;		
	
	@PreAuthorize("hasRole('PAGINACLIENTELEITURA') or hasRole('SUPER') or hasRole('ADMIN') or hasRole('PAGINACLIENTE')")
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<List<ClienteDTO>> findAll() {
		List<Cliente> list = service.findAll(); //apesar de estar com findAll ele respeita,
	                                             // e acessa somente as tabelas definidas no PessoaDTO
	List<ClienteDTO> listDto = list.stream().map(obj -> new ClienteDTO(obj)).collect(Collectors.toList());  

	return ResponseEntity.ok().body(listDto);
	}

	@PreAuthorize("hasRole('PAGINACLIENTELEITURA') or hasRole('SUPER') or hasRole('ADMIN') or hasRole('PAGINACLIENTE')")	
	@RequestMapping(value="/{id}",method=RequestMethod.GET)
	public ResponseEntity<?> find(@PathVariable Integer id) {
		Cliente obj = service.find(id);
		
		ClienteDTO objDto = new ClienteDTO(obj); 
		
		return ResponseEntity.ok().body(objDto);
	}

	@PreAuthorize("hasRole('SUPER') or hasRole('ADMIN') or hasRole('PAGINACLIENTE')")
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<?> insert(@Valid @RequestBody Cliente obj) {		
		obj = service.insert(obj);
		return ResponseEntity.ok().body(obj);
	}
}
