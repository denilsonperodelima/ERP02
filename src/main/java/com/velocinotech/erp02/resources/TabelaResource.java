package com.velocinotech.erp02.resources;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.velocinotech.erp02.domain.Tabela;
import com.velocinotech.erp02.services.TabelaService;

@RestController
@RequestMapping(value="/tabela")
public class TabelaResource {

	@Autowired
	private TabelaService service;

	@RequestMapping(value="/grupo/{idempresa}/{grupo}",method=RequestMethod.GET)
	public ResponseEntity<?> find(@PathVariable Integer idempresa, @PathVariable String grupo) {
		List<Tabela> obj = service.getGrupo(idempresa, grupo);
		return ResponseEntity.ok().body(obj);
	}

	@RequestMapping(value="/grupo/{id}",method=RequestMethod.GET)
	public ResponseEntity<?> find1(@PathVariable Integer id) {
		List<Tabela> obj = service.getSomenteGrupos(id);
		return ResponseEntity.ok().body(obj);
	}	
	
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<String> insert(@Valid @RequestBody Tabela obj)  {		
		service.insert(obj);	      		
		return ResponseEntity.ok().body("Operação realizada com sucesso !!!");
	}

	
	@RequestMapping(value="/{id}",method=RequestMethod.GET)
	public ResponseEntity<?> find(@PathVariable Integer id) {
		Tabela obj = service.find(id);
		return ResponseEntity.ok().body(obj);
	}	
	
	@RequestMapping(value="/delete",method=RequestMethod.POST)
	public ResponseEntity<?> deleteLogic(@Valid @RequestBody Tabela obj) {		
		service.deleteLogic(obj);
		return ResponseEntity.ok().body("Operação efetuada com sucesso");
	}	
	
	@RequestMapping(value="/voltadelete",method=RequestMethod.POST)
	public ResponseEntity<?> voltaDeleteLogic(@Valid @RequestBody Tabela obj) {		
		service.returnDeleteLogic(obj);
		return ResponseEntity.ok().body("Operação efetuada com sucesso");
	}	
}
