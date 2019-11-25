package com.velocinotech.erp02.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonTypeName;

@Entity
@JsonTypeName("fornecedor")
public class Fornecedor extends Pessoa  {

	private static final long serialVersionUID = 1L;
	
	private String inscestadual;
	private String inscmunicipal;
	private String nomefantasia;
	private Empresa empresa;

	@ManyToMany(mappedBy="fornecedores")
	private List<Produto> produtos = new ArrayList<>();
	
	public Fornecedor() {
	}
	
	public Fornecedor(Integer id, String tipopessoa, String documento, String nome , String usuinc
		      , String usualt ,String usuexc ,Date dtaltera ,Date dtinclui, Date dtexclui
		      ,Empresa empresa,List<Endereco> enderecos,List<Contato> contatos ,String tiporelacionamento
		      , Integer empresaid,List<Banco> bancos,String inscestadual, String inscmunicipal	, String nomefantasia) {
		super(id,tipopessoa, documento,nome, usuinc, usualt, usuexc, dtaltera,dtinclui,dtexclui, empresa,enderecos,contatos
				,tiporelacionamento, empresaid, bancos);
		this.inscestadual = inscestadual;
		this.inscmunicipal = inscmunicipal;
		this.nomefantasia = nomefantasia;
		this.empresa = empresa;
	}

	public String getInscestadual() {
		return inscestadual;
	}

	public void setInscestadual(String inscestadual) {
		this.inscestadual = inscestadual;
	}

	public String getInscmunicipal() {
		return inscmunicipal;
	}

	public void setInscmunicipal(String inscmunicipal) {
		this.inscmunicipal = inscmunicipal;
	}

	public String getNomefantasia() {
		return nomefantasia;
	}

	public void setNomefantasia(String nomefantasia) {
		this.nomefantasia = nomefantasia;
	}

	public Empresa getEmpresa() {
		return empresa;
	}

	public void setEmpresa(Empresa empresa) {
		this.empresa = empresa;
	}

	public List<Produto> getProdutos() {
		return produtos;
	}

	public void setProdutos(List<Produto> produtos) {
		this.produtos = produtos;
	}

}