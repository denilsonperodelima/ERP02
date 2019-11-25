package com.velocinotech.erp02.dto;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.velocinotech.erp02.domain.Pessoa;
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "@type")	
public class PessoaDTOSingle implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer id;
	private  String tiporelacionamento;	
	private String tipopessoa;
	private String documento;
	private String nome;
	private String usuinc;
	private String usualt;
	private Date dtaltera;
	private Date dtinclui;
	private Date dtexclui;
	private String usuexc;	

	public PessoaDTOSingle() {
	}
	
	public PessoaDTOSingle(Pessoa obj) {
		id = obj.getId();
		tipopessoa = obj.getTipopessoa();
		documento = obj.getDocumento();
		nome = obj.getNome();
		usuinc = obj.getUsuinc();
		usualt = obj.getUsualt();
		dtinclui = obj.getDtinclui();
		dtaltera = obj.getDtaltera();	
		dtexclui = obj.getDtexclui();
		usuexc = obj.getUsuexc();
		tiporelacionamento = obj.getTiporelacionamento();
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
	
}