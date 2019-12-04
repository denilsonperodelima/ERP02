package com.velocinotech.erp02.resources;



import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.velocinotech.erp02.domain.Empresa;
import com.velocinotech.erp02.dto.EmpresaDTO;
import com.velocinotech.erp02.dto.EmpresaUsuarioDTO;
import com.velocinotech.erp02.services.EmpresaService;

@RestController
@RequestMapping(value="/empresa")
public class EmpresaResource {

	@Autowired
	private EmpresaService service;

	@PreAuthorize("hasAnyRole('SUPER')")
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<List<EmpresaDTO>> findAll() {
		List<Empresa> list = service.findAll();
		List<EmpresaDTO> listDto = list.stream().map(obj -> new EmpresaDTO(obj)).collect(Collectors.toList());  
		
		return ResponseEntity.ok().body(listDto);
	}
	@PreAuthorize("hasAnyRole('SUPER')")
	@RequestMapping(value="/usuario",method=RequestMethod.GET)
	public ResponseEntity<List<EmpresaUsuarioDTO>> findAllEmpresaUsuario() {
		List<Empresa> list = service.findAll();
		List<EmpresaUsuarioDTO> listDto = list.stream().map(obj -> new EmpresaUsuarioDTO(obj)).collect(Collectors.toList());  
		
		return ResponseEntity.ok().body(listDto);
	}
	@PreAuthorize("hasAnyRole('SUPER')")
	@RequestMapping(value="/{id}",method=RequestMethod.GET)
	public ResponseEntity<?> find(@PathVariable Integer id) {
		Empresa obj = service.find(id);
		EmpresaDTO objdto = new EmpresaDTO(obj);
		return ResponseEntity.ok().body(objdto);
	}

	@PreAuthorize("hasAnyRole('SUPER')")
	@RequestMapping(value="/nome/{nome}",method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> find(@PathVariable String nome) {
		List<Empresa> obj = service.FindNomeLike(nome);
		return ResponseEntity.ok().body(obj);
	}
	
	@PreAuthorize("hasAnyRole('SUPER')")
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<String> insert(@Valid @RequestBody Empresa objemp)  {
		
		service.insert(objemp);	

		URI uri = ServletUriComponentsBuilder.fromCurrentRequest() 
				.path("/{id}").buildAndExpand(objemp.getId()).toUri();		
		
		ObjectMapper mapper = new ObjectMapper();
		ObjectNode root = mapper.createObjectNode();

		root.put("ret", 1);

		ObjectNode child = root.putObject("retorno");
		child.put("id", objemp.getId().toString());
		child.put("mensagem", "Operação efetuada com sucesso !!!");
		child.put("uri", uri.toString());	
		child.put("obj", objemp.getClass().toString());
       		
		return ResponseEntity.ok().body(root.toString());

	}


	@RequestMapping(value="/arpz",method=RequestMethod.POST)
	public ResponseEntity<Void> insertarpz(@Valid @RequestBody Empresa objEmp) {
		
		//Empresa obj = service.fromDTOARPZ(objEmp);
		
		service.deleteARPZ();
		
		service.insertARPZ();
		
		return ResponseEntity.noContent().build();
	}
	
	@PreAuthorize("hasAnyRole('SUPER')")
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<Void> update(@Valid @RequestBody EmpresaDTO objDTO, @PathVariable Integer id) {
		Empresa obj = service.fromDTO(objDTO);
		obj.setId(id);
		obj = service.update(obj);
		return ResponseEntity.noContent().build();
	}

	@RequestMapping(value="/mokproduto/{id}",method=RequestMethod.POST)
	public ResponseEntity<Void> gerarProdutos(@PathVariable Integer id) {
		
		service.gerarProdutos(id);
		
		return ResponseEntity.noContent().build();
	}	
}
