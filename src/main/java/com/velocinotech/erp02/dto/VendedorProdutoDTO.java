package com.velocinotech.erp02.dto;

import java.io.Serializable;
import java.util.List;

import com.velocinotech.erp02.domain.Produto;
import com.velocinotech.erp02.domain.Vendedor;

public class VendedorProdutoDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer id;
	private String nome;
	List<Produto> produtos;
	
	
	public VendedorProdutoDTO() {		
	}
	
	public VendedorProdutoDTO(Vendedor obj) {
		id = obj.getId();
		nome = obj.getNome();
		produtos = obj.getProdutos();

	}

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}

	public List<Produto> getProdutos() {
		return produtos;
	}

	public void setProdutos(List<Produto> produtos) {
		this.produtos = produtos;
	}

}