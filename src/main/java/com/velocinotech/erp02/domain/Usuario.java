package com.velocinotech.erp02.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.transaction.Transactional;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.velocinotech.erp02.domain.enums.Perfil;
import com.velocinotech.erp02.domain.enums.TipoCliente;

@Entity
@Transactional //colocado apos org.hibernate.LazyInitializationException
public class Usuario implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	@Column(nullable=false)
	private String nome;	
	@Column(unique=true, nullable=false)
	private String email;
	private String cpfOuCnpj;
	private Integer tipo; // fisica ou juridica
	private Integer idempresa ;
	@Column(nullable=false)
	private String status; // ativo ou cancelado 
	@JsonFormat(pattern="dd/MM/yyyy")
	private Date dataexpira;
	@JsonIgnore
	private String senha;
	private String nomeempresa;
	
	@ElementCollection(fetch=FetchType.EAGER) // <<CUIDADO>> SE NÃO FOR EAGER NÃO AUTENTICA
	@CollectionTable(name="PERFIS")
	private Set<Integer> perfis = new HashSet<>();
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="pessoa_id")
	private Pessoa pessoa;
	
	public Usuario() {
		addPerfil(Perfil.USUARIOSIS); //UTILIZAR RECURSOS BASICOS DO SISTEMA
	}

	public Usuario(Integer id, String nome, String email, String cpfOuCnpj, TipoCliente tipo, String senha
			, Pessoa pessoa, Integer idempresa, Date dataexpira, String status, String nomeempresa) {
		super();
		this.id = id;
		this.nome = nome;
		this.email = email;
		this.cpfOuCnpj = cpfOuCnpj;
		this.tipo = (tipo==null) ? null : tipo.getCod();
		this.senha = senha;
		addPerfil(Perfil.USUARIOSIS);
		this.pessoa = pessoa;
		this.idempresa = idempresa;
		this.dataexpira = dataexpira;
		this.status = status;
		this.nomeempresa = nomeempresa;
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

	public String getEmail() {
		return email;
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

	public TipoCliente getTipo() {
		return TipoCliente.toEnum(tipo);
	}

	public void setTipo(TipoCliente tipo) {
		this.tipo = tipo.getCod();
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}	

	public Set<Perfil> getPerfis() {
		return perfis.stream().map(x -> Perfil.toEnum(x)).collect(Collectors.toSet());
	}
	
	public void addPerfil(Perfil perfil) {
		perfis.add(perfil.getCod());
	}
	
	public void addPerfilCodigo(Integer codigo) {
		perfis.add(codigo);
	}
	

		
	public Pessoa getPessoa() {
		return pessoa;
	}

	public void setPessoa(Pessoa pessoa) {
		this.pessoa = pessoa;
	}

	public Date getDataexpira() {
		return dataexpira;
	}

	public void setDataexpira(Date dataexpira) {
		this.dataexpira = dataexpira;
	}

	public Integer getIdempresa() {
		return idempresa;
	}

	public void setIdempresa(Integer idempresa) {
		this.idempresa = idempresa;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	public String getNomeempresa() {
		return nomeempresa;
	}

	public void setNomeempresa(String nomeempresa) {
		this.nomeempresa = nomeempresa;
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
		Usuario other = (Usuario) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}