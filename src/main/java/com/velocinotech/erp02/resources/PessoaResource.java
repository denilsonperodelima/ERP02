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
import com.velocinotech.erp02.domain.Funcionario;
import com.velocinotech.erp02.domain.Pessoa;
import com.velocinotech.erp02.dto.FuncionarioDTO;
import com.velocinotech.erp02.dto.PessoaDTO;
import com.velocinotech.erp02.services.FuncionarioService;
import com.velocinotech.erp02.services.PessoaService;

@RestController
@RequestMapping(value="/pessoa")
public class PessoaResource {

	@Autowired
	private PessoaService service;
	
	@Autowired
	private FuncionarioService funcionarioservice;
	
	@PreAuthorize("hasRole('PAGINACLIENTELEITURA') "
		+ "or hasRole('PAGINAFUNCIONARIOLEITURA') "
		+ "or hasRole('PAGINAFUNCIONARIO') "
		+ "or hasRole('SUPER') "
		+ "or hasRole('ADMIN') "
		+ "or hasRole('PAGINACLIENTE')")
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<List<PessoaDTO>> findAll() {
		List<Pessoa> list = service.findAll(); //apesar de estar com findAll ele respeita,
		                                       // e acessa somente as tabelas definidas no PessoaDTO
		List<PessoaDTO> listDto = list.stream().map(obj -> new PessoaDTO(obj)).collect(Collectors.toList());  
		
		return ResponseEntity.ok().body(listDto);
	}

	/*
	@PreAuthorize("hasRole('PAGINACLIENTELEITURA') "
			+ "or hasRole('PAGINAFUNCIONARIOLEITURA') "
			+ "or hasRole('PAGINAFUNCIONARIO') "
			+ "or hasRole('SUPER') or hasRole('ADMIN') or hasRole('PAGINACLIENTE')")
			*/
	@RequestMapping(value="/{id}",method=RequestMethod.GET)
	public ResponseEntity<?> find(@PathVariable Integer id) {				
		Pessoa obj = service.find(id);
		PessoaDTO objDto = new PessoaDTO(obj); 		
		return ResponseEntity.ok().body(objDto);				
	}	

	@PreAuthorize("hasRole('SUPER') "
			+ "or hasRole('PAGINAFUNCIONARIO') "			
			+ "or hasRole('ADMIN') "
			+ "or hasRole('PAGINACLIENTE')")
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<?> insert(@Valid @RequestBody Pessoa obj)  {		
		service.insert(obj);	
		if (obj instanceof Funcionario) {
			Funcionario objfunc = funcionarioservice.find(obj.getId());
			FuncionarioDTO objDTO = new FuncionarioDTO(objfunc);
			return ResponseEntity.ok().body(objDTO);			
		}
		return ResponseEntity.ok().body(obj);
	}	

	@PreAuthorize("hasRole('SUPER') or hasRole('ADMIN') "
			+ "or hasRole('PAGINAFUNCIONARIO') "
			+ "or hasRole('PAGINACLIENTE')")	
	@RequestMapping(value="/inclusaousuario",method=RequestMethod.POST)
	public ResponseEntity<?> insertusuario(@Valid @RequestBody Pessoa obj)  {		
		service.insert(obj);	
		return ResponseEntity.ok().body(obj.getUsuarios());
	}

	@PreAuthorize("hasRole('SUPER') or hasRole('ADMIN') "
			+ "or hasRole('PAGINAFUNCIONARIO') "
			+ "or hasRole('PAGINACLIENTE')")
	@RequestMapping(value="/alterausuario/{id}",method=RequestMethod.POST)
	public ResponseEntity<?> altera(@Valid @RequestBody Pessoa obj)  {		
		service.alterausuario(obj);	
		if (obj instanceof Funcionario) {
			Funcionario objfunc = funcionarioservice.find(obj.getId());
			return ResponseEntity.ok().body(objfunc);			
		}
		return ResponseEntity.ok().body(obj);
	}

	@PreAuthorize("hasRole('PAGINACLIENTELEITURA') "
			+ "or hasRole('PAGINAFUNCIONARIOLEITURA') "
			+ "or hasRole('PAGINAFUNCIONARIO') "
			+ "or hasRole('SUPER') or hasRole('ADMIN') or hasRole('PAGINACLIENTE')")
	@RequestMapping(value="/documento/{idempresa}/{tiporelacionamento}/{documento}",method=RequestMethod.GET)
	public ResponseEntity<?> findByDocumento(@PathVariable Integer idempresa, @PathVariable String tiporelacionamento, @PathVariable String documento) {	
		List<Pessoa> pessoas = service.findByDocumento(idempresa, tiporelacionamento, documento); 
		return ResponseEntity.ok().body(pessoas);			
	}
	
	@PreAuthorize("hasRole('SUPER')"
			+ "or hasRole('PAGINAFUNCIONARIO') "			
			+ " or hasRole('ADMIN') or hasRole('PAGINACLIENTE')")	
	@RequestMapping(value="/{delete}",method=RequestMethod.POST)
	public ResponseEntity<?> deleteLogic(@Valid @RequestBody Cliente obj) {		
		service.deleteLogic(obj);
		return ResponseEntity.ok().body("Exclusão efetuada com sucesso");
	}
	
	@PreAuthorize("hasRole('PAGINACLIENTELEITURA') "
			+ "or hasRole('PAGINAFUNCIONARIOLEITURA') "
			+ "or hasRole('PAGINAFUNCIONARIO') "
			+ "or hasRole('SUPER') or hasRole('ADMIN') or hasRole('PAGINACLIENTE')")	
	@RequestMapping(value="/nome/{id}/{tiporelacionamento}/{nome}",method=RequestMethod.GET)
	public ResponseEntity<?> find(@PathVariable Integer id, @PathVariable String tiporelacionamento, @PathVariable String nome) {
		List<Pessoa> obj = service.FindNomeLike(id, tiporelacionamento, nome);
		return ResponseEntity.ok().body(obj);
	}	
}
