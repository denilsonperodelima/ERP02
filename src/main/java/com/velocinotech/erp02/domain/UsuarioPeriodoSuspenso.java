package com.velocinotech.erp02.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class UsuarioPeriodoSuspenso implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	@JsonFormat(pattern="dd/MM/yyyy")
	private Date Datainicio;

	@JsonFormat(pattern="dd/MM/yyyy")
	private Date Datafim;

    private Integer Horainicio;
    private Integer Horafim;
    
    
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="funcionario_id")
	private Funcionario funcionario;

	public UsuarioPeriodoSuspenso() {
	}	
	
	public UsuarioPeriodoSuspenso(Integer id, Date datainicio, Date datafim, Integer horainicio, Integer horafim,
			Funcionario funcionario) {
		super();
		this.id = id;
		Datainicio = datainicio;
		Datafim = datafim;
		Horainicio = horainicio;
		Horafim = horafim;
		this.funcionario = funcionario;
	}

	
	
	public Integer getId() {
		return id;
	}



	public void setId(Integer id) {
		this.id = id;
	}



	public Date getDatainicio() {
		return Datainicio;
	}



	public void setDatainicio(Date datainicio) {
		Datainicio = datainicio;
	}



	public Date getDatafim() {
		return Datafim;
	}



	public void setDatafim(Date datafim) {
		Datafim = datafim;
	}



	public Integer getHorainicio() {
		return Horainicio;
	}



	public void setHorainicio(Integer horainicio) {
		Horainicio = horainicio;
	}



	public Integer getHorafim() {
		return Horafim;
	}



	public void setHorafim(Integer horafim) {
		Horafim = horafim;
	}



	public Funcionario getFuncionario() {
		return funcionario;
	}



	public void setFuncionario(Funcionario funcionario) {
		this.funcionario = funcionario;
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
		UsuarioPeriodoSuspenso other = (UsuarioPeriodoSuspenso) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}