package com.velocinotech.erp02.dto;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.velocinotech.erp02.domain.Produto;

public class ProdutoDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer id;
	private String nome;
	private String marca;
	private String unidade;
	private Double pesobruto;
	private Double pesoliquido;	
	private Double volume;
	private String ncm;
	private String localizacaoestoque;
	private Integer estoqueminimo;
	private Integer estoquemaximo;
	private String codigoean;	
	private Double valorvenda;
	private Double valorcusto;
	private String origem;
	private String situacao; //ativo ;inativo
	private String tipo; //produto; serviço
	private String obs;
	private String categoria;
	private String subcategoria1;
	private String subcategoria2;
	private String subcategoria3;
	private String subcategoria4;
	private  String usuinc;
	private  String usualt;
	private  String usuexc;
	@JsonFormat(pattern="dd/MM/yyyy")	
	private  Date dtaltera;
	@JsonFormat(pattern="dd/MM/yyyy")	
	private  Date dtinclui;
	@JsonFormat(pattern="dd/MM/yyyy")	
	private  Date dtexclui;

	public ProdutoDTO() {		
	}
	
	public ProdutoDTO(Produto obj) {
		id = obj.getId();
		nome = obj.getNome();
		marca = obj.getMarca();
		unidade = obj.getUnidade();
		pesobruto = obj.getPesobruto();
		pesoliquido = obj.getPesoliquido();		
		volume = obj.getVolume();
		ncm = obj.getNcm();
		localizacaoestoque = obj.getLocalizacaoestoque();
		estoqueminimo = obj.getEstoqueminimo();
		estoquemaximo = obj.getEstoquemaximo();
		codigoean = obj.getCodigoean();
		valorvenda = obj.getValorvenda();
		valorcusto = obj.getValorcusto();
		origem = obj.getOrigem();
		situacao = obj.getSituacao();
		tipo = obj.getTipo();
		obs = obj.getObs();
		categoria = obj.getCategoria();
		subcategoria1 = obj.getSubcategoria1();
		subcategoria2 = obj.getSubcategoria2();
		subcategoria3 = obj.getSubcategoria3();
		subcategoria4 = obj.getSubcategoria4();
		usuinc = obj.getUsuinc();
		usualt = obj.getUsualt();
		usuexc = obj.getUsuexc();
		dtaltera = obj.getDtaltera();
		dtinclui = obj.getDtinclui();
		dtexclui = obj.getDtexclui(); 
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

	public String getMarca() {
		return marca;
	}

	public void setMarca(String marca) {
		this.marca = marca;
	}

	public String getUnidade() {
		return unidade;
	}

	public void setUnidade(String unidade) {
		this.unidade = unidade;
	}

	public Double getPesobruto() {
		return pesobruto;
	}

	public void setPesobruto(Double pesobruto) {
		this.pesobruto = pesobruto;
	}

	public Double getPesoliquido() {
		return pesoliquido;
	}

	public void setPesoliquido(Double pesoliquido) {
		this.pesoliquido = pesoliquido;
	}

	public Double getVolume() {
		return volume;
	}

	public void setVolume(Double volume) {
		this.volume = volume;
	}

	public String getNcm() {
		return ncm;
	}

	public void setNcm(String ncm) {
		this.ncm = ncm;
	}

	public String getLocalizacaoestoque() {
		return localizacaoestoque;
	}

	public void setLocalizacaoestoque(String localizacaoestoque) {
		this.localizacaoestoque = localizacaoestoque;
	}

	public Integer getEstoqueminimo() {
		return estoqueminimo;
	}

	public void setEstoqueminimo(Integer estoqueminimo) {
		this.estoqueminimo = estoqueminimo;
	}

	public Integer getEstoquemaximo() {
		return estoquemaximo;
	}

	public void setEstoquemaximo(Integer estoquemaximo) {
		this.estoquemaximo = estoquemaximo;
	}

	public String getCodigoean() {
		return codigoean;
	}

	public void setCodigoean(String codigoean) {
		this.codigoean = codigoean;
	}

	public Double getValorvenda() {
		return valorvenda;
	}

	public void setValorvenda(Double valorvenda) {
		this.valorvenda = valorvenda;
	}

	public Double getValorcusto() {
		return valorcusto;
	}

	public void setValorcusto(Double valorcusto) {
		this.valorcusto = valorcusto;
	}

	public String getOrigem() {
		return origem;
	}

	public void setOrigem(String origem) {
		this.origem = origem;
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

	public String getObs() {
		return obs;
	}

	public void setObs(String obs) {
		this.obs = obs;
	}

	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}

	public String getSubcategoria1() {
		return subcategoria1;
	}

	public void setSubcategoria1(String subcategoria1) {
		this.subcategoria1 = subcategoria1;
	}

	public String getSubcategoria2() {
		return subcategoria2;
	}

	public void setSubcategoria2(String subcategoria2) {
		this.subcategoria2 = subcategoria2;
	}

	public String getSubcategoria3() {
		return subcategoria3;
	}

	public void setSubcategoria3(String subcategoria3) {
		this.subcategoria3 = subcategoria3;
	}

	public String getSubcategoria4() {
		return subcategoria4;
	}

	public void setSubcategoria4(String subcategoria4) {
		this.subcategoria4 = subcategoria4;
	}

	public String getUsuinc() {
		return usuinc;
	}

	public void setUsuinc(String usuinc) {
		this.usuinc = usuinc;
	}

	public String getUsualt() {
		return usualt;
	}

	public void setUsualt(String usualt) {
		this.usualt = usualt;
	}

	public String getUsuexc() {
		return usuexc;
	}

	public void setUsuexc(String usuexc) {
		this.usuexc = usuexc;
	}

	public Date getDtaltera() {
		return dtaltera;
	}

	public void setDtaltera(Date dtaltera) {
		this.dtaltera = dtaltera;
	}

	public Date getDtinclui() {
		return dtinclui;
	}

	public void setDtinclui(Date dtinclui) {
		this.dtinclui = dtinclui;
	}

	public Date getDtexclui() {
		return dtexclui;
	}

	public void setDtexclui(Date dtexclui) {
		this.dtexclui = dtexclui;
	}

	
}