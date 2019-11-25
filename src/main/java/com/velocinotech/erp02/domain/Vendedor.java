package com.velocinotech.erp02.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonTypeName;

@Entity
@JsonTypeName("vendedor")
public class Vendedor extends Pessoa  {

	private static final long serialVersionUID = 1L;
	
	private String situacao; //ativo ou inativo
	private String tipo; //interno; externo
	private String email;

	@JsonBackReference
	@ManyToMany(mappedBy="vendedores")
	private List<Produto> produtos = new ArrayList<>();

	//@JsonBackReference
	@OneToMany(mappedBy="vendedor", fetch = FetchType.LAZY)
	private List<Pedido> pedidos = new ArrayList<>();
	
	public Vendedor() {
	}
	
	public Vendedor(Integer id, String tipopessoa, String documento, String nome , String usuinc
		      , String usualt ,String usuexc ,Date dtaltera ,Date dtinclui, Date dtexclui
		      ,Empresa empresa,List<Endereco> enderecos,List<Contato> contatos ,String tiporelacionamento
		      , Integer empresaid,List<Banco> bancos,String situacao, String tipo, String email) {
		super(id,tipopessoa, documento,nome, usuinc, usualt, usuexc, dtaltera,dtinclui,dtexclui, empresa,enderecos,contatos
				,tiporelacionamento, empresaid,bancos);
		this.situacao = situacao;
		this.tipo = tipo;
		this.email = email;
	}

	public String getSituacao() {
		return situacao;
	}

	public void setSituacao(String situacao) {
		this.situacao = situacao;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public List<Produto> getProdutos() {
		return produtos;
	}

	public void setProdutos(List<Produto> produtos) {
		this.produtos = produtos;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<Pedido> getPedidos() {
		return pedidos;
	}

	public void setPedidos(List<Pedido> pedidos) {
		this.pedidos = pedidos;
	}


}