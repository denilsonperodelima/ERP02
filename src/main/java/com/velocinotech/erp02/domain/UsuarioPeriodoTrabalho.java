package com.velocinotech.erp02.domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class UsuarioPeriodoTrabalho implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	private Integer diadasemana;
	private Integer horainicio;
	private Integer horafim;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="funcionario_id")
	private Funcionario funcionario;
	
	public UsuarioPeriodoTrabalho() {
	}	
	public UsuarioPeriodoTrabalho(Integer id, Integer diadasemana, Integer horainicio, Integer horafim,
			Funcionario funcionario) {
		super();
		this.id = id;
		this.diadasemana = diadasemana;
		this.horainicio = horainicio;
		this.horafim = horafim;
		this.funcionario = funcionario;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getDiadasemana() {
		return diadasemana;
	}
	public void setDiadasemana(Integer diadasemana) {
		this.diadasemana = diadasemana;
	}
	public void setHorainicio(Integer horainicio) {
		this.horainicio = horainicio;
	}

	public Integer getHorafim() {
		return horafim;
	}

	public void setHorafim(Integer horafim) {
		this.horafim = horafim;
	}

	public Funcionario getFuncionario() {
		return funcionario;
	}

	public void setFuncionario(Funcionario funcionario) {
		this.funcionario = funcionario;
	}
	
	public Integer getHorainicio() {
		return horainicio;
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
		UsuarioPeriodoTrabalho other = (UsuarioPeriodoTrabalho) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}