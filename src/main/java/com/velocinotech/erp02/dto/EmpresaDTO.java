package com.velocinotech.erp02.dto;

import java.io.Serializable;
import java.util.List;

import com.velocinotech.erp02.domain.Empresa;
import com.velocinotech.erp02.domain.Usuario;

public class EmpresaDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Integer id;
	private String nome;
	private String documento;
	private String endereco;
	private String cep;
	private String cidade;	
	private String uf;
	private String status;  // ATIVO ; SUSPENSO
	private String contato1;
	private String contato2;
	private String contato3;
	private String segmento;	
	List<Usuario> usuarios;

	public EmpresaDTO() {
	}
	
	public EmpresaDTO(Empresa obj) {
		id = obj.getId();
		nome = obj.getNome();
		documento = obj.getDocumento();
		endereco = obj.getEndereco();
		cep = obj.getCep();
		cidade = obj.getCidade();
		uf = obj.getUf();
		status = obj.getStatus();
		contato1 = obj.getContato1();
		contato2 = obj.getContato2();
		contato3 = obj.getContato3();
		segmento = obj.getSegmento();
		//usuarios = obj.getUsuarios();
 		//pessoas = obj.getPessoas();  // Se linha for omitida não será feito acesso á base, pq pessoa está com fetch lazy
 		                             // na classe empresa.
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

	public String getDocumento() {
		return documento;
	}

	public void setDocumento(String documento) {
		this.documento = documento;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getUf() {
		return uf;
	}

	public void setUf(String uf) {
		this.uf = uf;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getContato1() {
		return contato1;
	}

	public void setContato1(String contato1) {
		this.contato1 = contato1;
	}

	public String getContato2() {
		return contato2;
	}

	public void setContato2(String contato2) {
		this.contato2 = contato2;
	}

	public String getContato3() {
		return contato3;
	}

	public void setContato3(String contato3) {
		this.contato3 = contato3;
	}


	public String getSegmento() {
		return segmento;
	}

	public void setSegmento(String segmento) {
		this.segmento = segmento;
	}


	public List<Usuario> getUsuarios() {
		return usuarios;
	}

	public void setUsuarios(List<Usuario> usuarios) {
		this.usuarios = usuarios;
	}

	public String getPessoa() {
		// TODO Auto-generated method stub
		return null;
	}

	
	

	
}