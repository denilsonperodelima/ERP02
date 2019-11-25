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
import javax.persistence.Index;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@javax.persistence.Table(indexes = { @Index(name = "INDGRUP1", columnList = ( "idempresa,descricao" ),unique=true)})
public class Grupo implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	private Integer idempresa;
	private String descricao;

	@JsonBackReference 
	@OneToMany(mappedBy="grupo", cascade=CascadeType.ALL, fetch=FetchType.LAZY)
    @OrderBy("descricao")
	private List<Subgrupo> subgrupo = new ArrayList<>();

	public Grupo() {
	}
	
	public Grupo(Integer id,Integer idempresa,  String descricao) {
		this.id = id;
		this.idempresa = idempresa;
		this.descricao = descricao;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getIdempresa() {
		return idempresa;
	}

	public void setIdempresa(Integer idempresa) {
		this.idempresa = idempresa;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	
	public List<Subgrupo> getSubgrupos() {
		return subgrupo;
	}

	public void setSubgrupos(List<Subgrupo> subgrupos) {
		this.subgrupo = subgrupos;
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
		Grupo other = (Grupo) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}