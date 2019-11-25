package com.velocinotech.erp02.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Subgrupo implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	private String descricao;

	@JsonBackReference //TIRAR REFERENCIA CIRCULAR **COLOCAR EM TODAS AS CLASSES 
	@ManyToOne
	@JoinColumn(name="grupo_id")
	private Grupo grupo;
	
	@OneToMany(mappedBy="subgrupo", cascade=CascadeType.ALL, fetch=FetchType.LAZY)
	private List<Subgrupoitem> subgrupoitens = new ArrayList<>();
	
	public Subgrupo() {
	}
	
	public Subgrupo(Integer id,  String descricao, Grupo grupo) {
		this.id = id;
		this.descricao = descricao;
		this.grupo = grupo;
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

	public List<Subgrupoitem> getSubgrupoitens() {
		return subgrupoitens;
	}

	public void setSubgrupoitens(List<Subgrupoitem> subgrupoitens) {
		this.subgrupoitens = subgrupoitens;
	}

	public Grupo getGrupo() {
		return grupo;
	}

	public void setGrupo(Grupo grupo) {
		this.grupo = grupo;
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
		Subgrupo other = (Subgrupo) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}