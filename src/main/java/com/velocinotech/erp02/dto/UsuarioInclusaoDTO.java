package com.velocinotech.erp02.dto;

import java.io.Serializable;
import java.util.Date;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.velocinotech.erp02.domain.Empresa;
import com.velocinotech.erp02.services.validation.ClienteInsert;

@ClienteInsert
public class UsuarioInclusaoDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@NotEmpty(message="Preenchimento obrigatório")
	@Length(min=5, max=120, message="O tamanho deve ser entre 5 e 120 caracteres")
	private String nome;

	@NotEmpty(message="Preenchimento obrigatório")
	@Email(message="Email inválido")
	private String email;

	private String cpfOuCnpj;
	
	private Integer tipo;
	
	@NotEmpty(message="Status - Preenchimento obrigatório")
	private String status; // ativo ou cancelado 

	@JsonFormat(pattern="dd/MM/yyyy")
	private Date dataexpira;
	
	Empresa empresa;

	public UsuarioInclusaoDTO() {
	}


	public String getNome() {
		return nome;
	}


	public void setNome(String nome) {
		this.nome = nome;
	}


	public String getEmail() {
		return email.replace("-",".");
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getCpfOuCnpj() {
		return cpfOuCnpj;
	}


	public void setCpfOuCnpj(String cpfOuCnpj) {
		this.cpfOuCnpj = cpfOuCnpj;
	}


	public Integer getTipo() {
		return tipo;
	}


	public void setTipo(Integer tipo) {
		this.tipo = tipo;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public Date getDataexpira() {
		return dataexpira;
	}


	public void setDataexpira(Date dataexpira) {
		this.dataexpira = dataexpira;
	}
	
	
	public Empresa getEmpresa() {
		return empresa;
	}


	public void setEmpresa(Empresa empresa) {
		this.empresa = empresa;
	}
}