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

import com.velocinotech.erp02.domain.Produto;
import com.velocinotech.erp02.dto.ProdutoDTO;
import com.velocinotech.erp02.services.ProdutoService;

@RestController
@RequestMapping(value="/produto")
public class ProdutoResource {



	@Autowired
	private ProdutoService service;
	/*
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<Page<ProdutoDTO>> findPage(
			@RequestParam(value="nome", defaultValue="") String nome, 
			@RequestParam(value="categorias", defaultValue="") String categorias, 
			@RequestParam(value="page", defaultValue="0") Integer page, 
			@RequestParam(value="linesPerPage", defaultValue="24") Integer linesPerPage, 
			@RequestParam(value="orderBy", defaultValue="nome") String orderBy, 
			@RequestParam(value="direction", defaultValue="ASC") String direction) {
		String nomeDecoded = URL.decodeParam(nome);
		List<Integer> ids = URL.decodeIntList(categorias);
		Page<Produto> list = service.search(nomeDecoded, ids, page, linesPerPage, orderBy, direction);
		Page<ProdutoDTO> listDto = list.map(obj -> new ProdutoDTO(obj));  
		return ResponseEntity.ok().body(listDto);
	}
*/
	@RequestMapping(value="/{id}",method=RequestMethod.GET)
	public ResponseEntity<?> find(@PathVariable Integer id) {
		Produto obj = service.find(id);
		ProdutoDTO objdto = new ProdutoDTO(obj);
		return ResponseEntity.ok().body(objdto);
	}

	@RequestMapping(value="/empresa/{id}",method=RequestMethod.GET)
	public ResponseEntity<?> produtosempresadto(@PathVariable Integer id) {
		List<ProdutoDTO> obj = service.getProdutosEmpresa(id);
		return ResponseEntity.ok().body(obj);
	}
	
	@RequestMapping(value="/nome/{idempresa}/{nome}",method=RequestMethod.GET)
	public ResponseEntity<?> produtonome(@PathVariable Integer idempresa, @PathVariable String nome) {
		List<Produto> obj = service.getProdutosEmpresa(idempresa, nome);
		return ResponseEntity.ok().body(obj);
	}	

	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<?> insert(@Valid @RequestBody Produto obj) {		
		obj = service.insert(obj);
		return ResponseEntity.ok().body(obj);
	}
}