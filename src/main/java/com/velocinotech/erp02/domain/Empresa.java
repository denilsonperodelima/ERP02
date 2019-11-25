package com.velocinotech.erp02.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.OneToMany;

@Entity
@javax.persistence.Table(indexes = { @Index(name = "INDEMP1", columnList = ( "nome" ))})
public class Empresa implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
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
		
	@OneToMany(mappedBy="empresa", fetch = FetchType.LAZY)
	private List<Pessoa> pessoas = new ArrayList<>();

	public Empresa() {
	}

	public Empresa(Integer id, String nome, String documento, String endereco, String cep, String cidade,
			String uf, String status, String contato1, String contato2, String contato3, String segmento, String pessoa) {
		super();
		this.id = id;
		this.nome = nome;
		this.documento = documento;
		this.endereco = endereco;
		this.cep = cep;
		this.cidade = cidade;
		this.uf = uf;
		this.status = status;
		this.contato1 = contato1;
		this.contato2 = contato2;
		this.contato3 = contato3;
		this.segmento = segmento;
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

	
	public List<Pessoa> getPessoas() {
		return pessoas;
	}

	public void setPessoas(List<Pessoa> pessoas) {
		this.pessoas = pessoas;
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
		Empresa other = (Empresa) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}