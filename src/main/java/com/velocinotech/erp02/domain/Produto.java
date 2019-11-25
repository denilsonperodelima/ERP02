 package com.velocinotech.erp02.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@javax.persistence.Table(indexes = { @Index(name = "PRODX1", columnList = ( "empresaid" ))
})
public class Produto  implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	private String nome;	
	private String marca;
	private String situacao; //ativo ;inativo
	private String tipo; //produto; serviço	
	private String unidade; //peça - kg - unid - etec	
	private Double pesobruto;
	private Double pesoliquido;	
	private Double volume;
	private String ncm;
	private String codigoean;	
	private String localizacaoestoque;
	private Integer estoqueminimo;
	private Integer estoquemaximo;		
	private Double valorvenda;
	private Double valorcusto;
	private String origem;
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
	private Integer empresaid;
	
	//@JsonBackReference
	@ManyToMany
	@JoinTable(name = "PRODUTO_FORNECEDOR",
		joinColumns = @JoinColumn(name = "produto_id"),
		inverseJoinColumns = @JoinColumn(name = "fornecedor_id")
	)
	private List<Fornecedor> fornecedores = new ArrayList<>();

	//@JsonBackReference
	@ManyToMany
	@JoinTable(name = "PRODUTO_VENDEDOR",
		joinColumns = @JoinColumn(name = "produto_id"),
		inverseJoinColumns = @JoinColumn(name = "vendedor_id")
	)
	private List<Vendedor> vendedores = new ArrayList<>();
	
	public Produto() {
		
	}
	
	public Produto(Integer id, String nome, String marca, String unidade, Double pesobruto, Double pesoliquido, Double volume, String ncm,
			String localizacaoestoque, Integer estoqueminimo, Integer estoquemaximo, String codigoean,
			Double valorvenda, Double valorcusto, String origem, String situacao, String tipo, String obs
			,String categoria,String subcategoria1,String subcategoria2	,String subcategoria3,String subcategoria4
			, String usuinc, String usualt,String usuexc,	Date dtaltera, Date dtinclui, Date dtexclui	, Integer empresaid		)
	{
		super();
		this.id = id;
		this.nome = nome;
		this.marca = marca;
		this.unidade = unidade;
		this.pesobruto = pesobruto;
		this.pesoliquido = pesoliquido;
		this.volume = volume;
		this.ncm = ncm;
		this.codigoean = codigoean;
		this.estoquemaximo = estoquemaximo;
		this.estoqueminimo = estoqueminimo;
		this.localizacaoestoque = localizacaoestoque;
		this.situacao = situacao;
		this.valorvenda = valorvenda;
		this.valorcusto = valorcusto;
		this.origem = origem;
		this.tipo = tipo;
		this.obs = obs;
		this.categoria = categoria;
		this.subcategoria1 = subcategoria1;
		this.subcategoria2 = subcategoria2;
		this.subcategoria3 = subcategoria3;		
		this.subcategoria4 = subcategoria4;
		this.usuinc = usuinc;
		this.usualt = usualt;
		this.usuexc = usuexc;		
		this.dtinclui = dtinclui;
		this.dtaltera = dtaltera;
		this.dtexclui = dtexclui;	
		this.empresaid = empresaid;
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

	public String getCodigoean() {
		return codigoean;
	}

	public void setCodigoean(String codigoean) {
		this.codigoean = codigoean;
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

	public Integer getEmpresaid() {
		return empresaid;
	}

	public void setEmpresaid(Integer empresaid) {
		this.empresaid = empresaid;
	}

	public List<Fornecedor> getFornecedores() {
		return fornecedores;
	}

	public void setFornecedores(List<Fornecedor> fornecedores) {
		this.fornecedores = fornecedores;
	}

	public List<Vendedor> getVendedores() {
		return vendedores;
	}

	public void setVendedores(List<Vendedor> vendedores) {
		this.vendedores = vendedores;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Produto other = (Produto) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	

}