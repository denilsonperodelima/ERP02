package com.velocinotech.erp02.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.velocinotech.erp02.domain.Banco;
import com.velocinotech.erp02.domain.Contato;
import com.velocinotech.erp02.domain.Endereco;
import com.velocinotech.erp02.domain.Pessoa;
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "@type")	
public class PessoaDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer id;
	private  String tiporelacionamento;	
	private String tipopessoa;
	private String documento;
	private String nome;
	private String usuinc;
	private String usualt;
	@JsonFormat(pattern="dd/MM/yyyy")		
	private Date dtaltera;
	@JsonFormat(pattern="dd/MM/yyyy")		
	private Date dtinclui;
	@JsonFormat(pattern="dd/MM/yyyy")		
	private Date dtexclui;
	private String usuexc;	
	List<Endereco> enderecos;
	List<Contato> contatos;	
	List<Banco> bancos;	
	
	public PessoaDTO() {
	}
	
	public PessoaDTO(Pessoa obj) {
		id = obj.getId();
		tipopessoa = obj.getTipopessoa();
		documento = obj.getDocumento();
		enderecos = obj.getEnderecos();
		contatos = obj.getContatos();
		nome = obj.getNome();
		usuinc = obj.getUsuinc();
		usualt = obj.getUsualt();
		dtinclui = obj.getDtinclui();
		dtaltera = obj.getDtaltera();	
		dtexclui = obj.getDtexclui();
		usuexc = obj.getUsuexc();
		tiporelacionamento = obj.getTiporelacionamento();
		bancos = obj.getBancos();
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

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
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

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Date getDtexclui() {
		return dtexclui;
	}

	public void setDtexclui(Date dtexclui) {
		this.dtexclui = dtexclui;
	}

	public String getUsuexc() {
		return usuexc;
	}

	public void setUsuexc(String usuexc) {
		this.usuexc = usuexc;
	}

	public String getTiporelacionamento() {
		return tiporelacionamento;
	}

	public void setTiporelacionamento(String tiporelacionamento) {
		this.tiporelacionamento = tiporelacionamento;
	}
	
	public List<Endereco> getEnderecos() {
		return enderecos;
	}

	public void setEnderecos(List<Endereco> enderecos) {
		this.enderecos = enderecos;
	}

	public List<Contato> getContatos() {
		return contatos;
	}

	public void setContatos(List<Contato> contatos) {
		this.contatos = contatos;
	}

	public List<Banco> getBancos() {
		return bancos;
	}

	public void setBancos(List<Banco> bancos) {
		this.bancos = bancos;
	}
	
}