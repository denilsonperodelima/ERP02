 package com.velocinotech.erp02.domain;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonTypeName;

@Entity
@JsonTypeName("administrador")
public class Administrador extends Pessoa  {
	private static final long serialVersionUID = 1L;
	@JsonFormat(pattern="dd/MM/yyyy")
	private Date nascimentodata;
	private String nascimentocidade;
	private String nascimentouf;	
	private String rg;
	private String estadocivil;
	@JsonFormat(pattern="dd/MM/yyyy")
	private Date entrada;
	private String cargo;

	private Empresa empresa; //se esquecer de declarar aqui fica null	

	public Administrador() {
	}
	
	public Administrador(Integer id  , String tipopessoa , String documento , String nome   , String usuinc
		      , String usualt ,String usuexc  ,Date dtaltera   ,Date dtinclui    , Date dtexclui
		      , Empresa empresa  ,List<Endereco> enderecos   ,List<Contato> contatos    ,String tiporelacionamento
		      , Integer empresaid,List<Banco> bancos, Date nascimentoData, String nascimentoCidade, String nascimentoUf
		      , String rG
		      , String estadocivil, Date entrada, String cargo) {
		super(id,tipopessoa, documento,nome, usuinc, usualt, usuexc, dtaltera,dtinclui,dtexclui, empresa,enderecos,contatos
				,tiporelacionamento, empresaid,bancos);			
		this.nascimentodata = nascimentoData;
		this.nascimentocidade = nascimentoCidade;
		this.nascimentouf = nascimentoUf;
		this.rg = rG;
		this.estadocivil = estadocivil;
		this.entrada = entrada;
		this.cargo = cargo;

		this.empresa = empresa;
	}

	public Date getNascimentodata() {
		return nascimentodata;
	}

	public void setNascimentodata(Date nascimentodata) {
		this.nascimentodata = nascimentodata;
	}

	public String getNascimentocidade() {
		return nascimentocidade;
	}

	public void setNascimentocidade(String nascimentocidade) {
		this.nascimentocidade = nascimentocidade;
	}

	public String getNascimentouf() {
		return nascimentouf;
	}

	public void setNascimentouf(String nascimentouf) {
		this.nascimentouf = nascimentouf;
	}

	public String getRg() {
		return rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public String getEstadocivil() {
		return estadocivil;
	}

	public void setEstadocivil(String estadocivil) {
		this.estadocivil = estadocivil;
	}

	public Date getEntrada() {
		return entrada;
	}

	public void setEntrada(Date entrada) {
		this.entrada = entrada;
	}

	public String getCargo() {
		return cargo;
	}

	public void setCargo(String cargo) {
		this.cargo = cargo;
	}

	public Empresa getEmpresa() {
		return empresa;
	}

	public void setEmpresa(Empresa empresa) {
		this.empresa = empresa;
	}



	
}