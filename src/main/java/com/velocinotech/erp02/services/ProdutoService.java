package com.velocinotech.erp02.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.velocinotech.erp02.domain.Produto;
import com.velocinotech.erp02.dto.ProdutoDTO;
import com.velocinotech.erp02.repositories.ProdutoRepository;
import com.velocinotech.erp02.services.exceptions.ObjectNotFoundException;

@Service
public class ProdutoService {
	
	@Autowired
	private ProdutoRepository repo;

	/*
	public Page<Produto> search(String nome, List<Integer> ids, Integer page, Integer linesPerPage, String orderBy, String direction) {
		PageRequest pageRequest = new PageRequest(page, linesPerPage, Direction.valueOf(direction), orderBy);
	//	List<Categoria> categorias = categoriaRepository.findAll(ids);
		return repo.findDistinctByNomeContainingAndCategoriasIn(nome, categorias, pageRequest);	
	}
	*/
	public Produto find(Integer id) {		
		Produto obj = repo.findOne(id);
		if (obj == null) {
			throw new ObjectNotFoundException(
					"Objeto não encontrado! Id: " + id + ", Tipo: " + Produto.class.getName());
		}
		return obj;
	}
	@Transactional
	public Produto insert(Produto obj) {
		repo.save(obj);
		return obj;
	}
	public List<ProdutoDTO> getProdutosEmpresa(Integer id) {
		List<ProdutoDTO> produtos = repo.getProdutosEmpresa(id);
		return produtos;
	}
	public List<Produto> getProdutosEmpresa(Integer idempresa, String nome) {		
	 List<Produto> produtos = repo.FindNomeLike(idempresa, nome);
	 return produtos;
	}
}