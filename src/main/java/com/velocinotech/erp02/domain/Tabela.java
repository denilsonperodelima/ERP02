package com.velocinotech.erp02.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@javax.persistence.Table(indexes = { @Index(name = "INDTAB1", columnList = ( "idempresa,grupo" ))})
public class Tabela implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	private Integer idempresa;
	private String grupo;
	private String subgrupo;
	private String descricao;
	@JsonFormat(pattern="dd/MM/yyyy")
	private Date dtexclui;

	public Tabela() {
	}
	
	public Tabela(Integer id,Integer idempresa, String grupo, String subgrupo, String descricao, Date dtexclui) {
		this.id = id;
		this.idempresa = idempresa;
		this.grupo = grupo;
		this.subgrupo = subgrupo;
		this.descricao = descricao;
		this.dtexclui = dtexclui;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getGrupo() {
		return grupo;
	}

	public void setGrupo(String grupo) {
		this.grupo = grupo;
	}

	public String getSubgrupo() {
		return subgrupo;
	}

	public void setSubgrupo(String subgrupo) {
		this.subgrupo = subgrupo;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Integer getIdempresa() {
		return idempresa;
	}

	public void setIdempresa(Integer idempresa) {
		this.idempresa = idempresa;
	}

	public Date getDtexclui() {
		return dtexclui;
	}

	public void setDtexclui(Date dtexclui) {
		this.dtexclui = dtexclui;
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
		Tabela other = (Tabela) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}