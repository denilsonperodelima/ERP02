package com.velocinotech.erp02.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Subgrupoitem implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	private String descricao;
	@JsonFormat(pattern="dd/MM/yyyy")
	private Date dtexclui;

	@JsonBackReference
	@ManyToOne
	@JoinColumn(name="subgrupo_id")
	private Subgrupo subgrupo;

	public Subgrupoitem() {
	}
	
	public Subgrupoitem(Integer id, Subgrupo subgrupo,  String descricao, Date dtexclui) {
		this.id = id;
		this.descricao = descricao;
		this.dtexclui = dtexclui;
		this.subgrupo = subgrupo;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Date getDtexclui() {
		return dtexclui;
	}

	public void setDtexclui(Date dtexclui) {
		this.dtexclui = dtexclui;
	}

	public Subgrupo getSubgrupo() {
		return subgrupo;
	}

	public void setSubgrupo(Subgrupo subgrupo) {
		this.subgrupo = subgrupo;
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
		Subgrupoitem other = (Subgrupoitem) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}