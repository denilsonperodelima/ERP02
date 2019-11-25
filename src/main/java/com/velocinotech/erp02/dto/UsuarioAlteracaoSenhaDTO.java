package com.velocinotech.erp02.dto;

import java.io.Serializable;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import com.velocinotech.erp02.domain.Usuario;
import com.velocinotech.erp02.services.validation.ClienteUpdate;

@ClienteUpdate
public class UsuarioAlteracaoSenhaDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@NotEmpty(message="ID Preenchimento obrigatório")
	private Integer id;
		
	@NotEmpty(message="Preenchimento obrigatório")
	@Email(message="Email inválido")
	private String email;
	
	@NotEmpty(message="Preenchimento obrigatório")
	private String senha;	
	
	public UsuarioAlteracaoSenhaDTO() {
	}

	public UsuarioAlteracaoSenhaDTO(Usuario obj) {
		id = obj.getId();
		email = obj.getEmail();
		senha = obj.getSenha();	
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}
}