package com.velocinotech.erp02.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@Entity

@javax.persistence.Table(indexes = { @Index(name = "INDPESS1", columnList = ( "empresaid, tiporelacionamento, nome" )) 
                                     ,  @Index(name = "INDPESS2", columnList = ( "nome" ))
                                   })

@Inheritance(strategy=InheritanceType.JOINED) // JOINED irá criar tabelas separadas; 
                                              // Outras irá criar um tabelão com todos os campos, colocando nullo nos
                                              // campos não pertinentes à classe 
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "@type")

public  abstract class Pessoa implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private  Integer id;
	private  String tiporelacionamento;
	private  String tipopessoa;
	private  String documento;
	private  String nome;
	private  String usuinc;
	private  String usualt;
	private  String usuexc;
	@JsonFormat(pattern="dd/MM/yyyy")	
	private  Date dtaltera;
	@JsonFormat(pattern="dd/MM/yyyy")	
	private  Date dtinclui;
	@JsonFormat(pattern="dd/MM/yyyy")	
	private  Date dtexclui;
	private  Integer empresaid;
	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="empresa_id")
	public  Empresa empresa;
	
	//@JsonBackReference
	@OneToMany(mappedBy="pessoa", fetch = FetchType.LAZY)
	private List<Endereco> enderecos = new ArrayList<>();
	
	//@JsonBackReference
	@OneToMany(mappedBy="pessoa", fetch = FetchType.LAZY)
	private List<Contato> contatos = new ArrayList<>();

	@OneToMany(mappedBy="pessoa", fetch = FetchType.LAZY)
	private List<Banco> bancos = new ArrayList<>();
	
	@OneToMany(mappedBy="pessoa", fetch = FetchType.LAZY)
	private List<Usuario> usuarios = new ArrayList<>();
	
	public Pessoa() {
	}

	public Pessoa(Integer id, String tipopessoa, String documento, String nome, String usuinc, String usualt
			,String usuexc,	Date dtaltera, Date dtinclui, Date dtexclui, Empresa empresa, List<Endereco> enderecos, List<Contato> contatos
			,String tiporelacionamento, Integer empresaid,List<Banco> bancos) {
		super();
		this.id = id;
		this.tipopessoa = tipopessoa;
		this.documento = documento;
		this.nome = nome;
		this.usuinc = usuinc;
		this.usualt = usualt;
		this.usuexc = usuexc;		
		this.dtinclui = dtinclui;
		this.dtaltera = dtaltera;
		this.dtexclui = dtexclui;		
		this.enderecos = enderecos;
		this.contatos = contatos;
		this.tiporelacionamento = tiporelacionamento;
		this.empresaid = empresaid;
		this.bancos = bancos;
		this.empresa = empresa;
	}

	public List<Contato> getContatos() {
		return contatos;
	}

	public void setContatos(List<Contato> contatos) {
		this.contatos = contatos;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTipopessoa() {
		return tipopessoa;
	}

	public void setTipopessoa(String tipopessoa) {
		this.tipopessoa = tipopessoa;
	}

	public String getDocumento() {
		return documento;
	}

	public void setDocumento(String documento) {
		this.documento = documento;
	}
	
	public  String getNome() {
		return nome;
	}

	public  void setNome(String nome) {
		this.nome = nome;
	}

	public  String getUsuinc() {
		return usuinc;
	}

	public  void setUsuinc(String usuinc) {
		this.usuinc = usuinc;
	}

	public String getUsualt() {
		return usualt;
	}

	public void setUsualt(String usualt) {
		this.usualt = usualt;
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

	public Empresa getEmpresa() {
		return empresa;
	}

	public void setEmpresa(Empresa empresa) {
		this.empresa = empresa;
	}
	
	public List<Endereco> getEnderecos() {
		return enderecos;
	}

	public void setEnderecos(List<Endereco> enderecos) {
		this.enderecos = enderecos;
	}

	public String getUsuexc() {
		return usuexc;
	}

	public void setUsuexc(String usuexc) {
		this.usuexc = usuexc;
	}

	public Date getDtexclui() {
		return dtexclui;
	}

	public void setDtexclui(Date dtexclui) {
		this.dtexclui = dtexclui;
	}

	
	public String getTiporelacionamento() {
		return tiporelacionamento;
	}

	public void setTiporelacionamento(String tiporelacionamento) {
		this.tiporelacionamento = tiporelacionamento;
	}

	
	public Integer getEmpresaid() {
		return empresaid;
	}

	public void setEmpresaid(Integer empresaid) {
		this.empresaid = empresaid;
	}

	public List<Banco> getBancos() {
		return bancos;
	}

	public void setBancos(List<Banco> bancos) {
		this.bancos = bancos;
	}

	public List<Usuario> getUsuarios() {
		return usuarios;
	}

	public void setUsuarios(List<Usuario> usuarios) {
		this.usuarios = usuarios;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Pessoa other = (Pessoa) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}



}