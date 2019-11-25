package com.velocinotech.erp02.resources;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.velocinotech.erp02.domain.Grupo;
import com.velocinotech.erp02.services.GrupoService;

@RestController
@RequestMapping(value="/grupo")
public class GrupoResource {

	@Autowired
	private GrupoService service;

	@PreAuthorize("hasRole('USUARIOSIS') or hasRole('SUPER') or hasRole('ADMIN')")
	@RequestMapping(value="/{idempresa}/{grupo}",method=RequestMethod.GET)
	public ResponseEntity<?> find(@PathVariable Integer idempresa, @PathVariable String grupo) {
		Grupo obj = service.getGrupo(idempresa, grupo);
		return ResponseEntity.ok().body(obj);
	}
	@PreAuthorize("hasRole('USUARIOSIS') or hasRole('SUPER') or hasRole('ADMIN')")
	@RequestMapping(value="/empresa/{idempresa}",method=RequestMethod.GET)
	public ResponseEntity<?> find1(@PathVariable Integer idempresa) {
		List<Grupo> obj = service.getSomenteGrupos(idempresa);
		return ResponseEntity.ok().body(obj);
	}	

	@PreAuthorize("hasRole('SUPER')")
	@RequestMapping(value="/tabela/{idempresa}",method=RequestMethod.POST)
	public ResponseEntity<?> carregargruposiniciais(@PathVariable Integer idempresa) {
		System.out.println("entrou com id " + idempresa);
		service.gerarGruposPorEmpresa(idempresa);
		return ResponseEntity.noContent().build();
	}
	
	@PreAuthorize("hasRole('SUPER') or hasRole('ADMIN')")	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<?> insert(@Valid @RequestBody Grupo obj)  {		
		service.insert(obj);	      		
		return ResponseEntity.ok().body(obj);
	}
	@PreAuthorize("hasRole('USUARIOSIS') or hasRole('SUPER') or hasRole('ADMIN')")	
	@RequestMapping(value="/{id}",method=RequestMethod.GET)
	public ResponseEntity<?> find(@PathVariable Integer id) {
		Grupo obj = service.find(id);
		return ResponseEntity.ok().body(obj);
	}		
}
