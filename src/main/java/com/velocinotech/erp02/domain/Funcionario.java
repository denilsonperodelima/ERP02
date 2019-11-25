 package com.velocinotech.erp02.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonTypeName;

@Entity
@JsonTypeName("funcionario")
public class Funcionario extends Pessoa  {
	private static final long serialVersionUID = 1L;
	@JsonFormat(pattern="dd/MM/yyyy")
	private Date nascimentodata;
	private String nascimentocidade;
	private String nascimentouf;
	private String ctps;	
	private String rg;
	private String pis;
	private String estadocivil;
	private String nomepai;
	private String nomemae;
	@JsonFormat(pattern="dd/MM/yyyy")
	private Date admissao;
	@JsonFormat(pattern="dd/MM/yyyy")
	private Date demissao;	
	private String registro;
	private String salario;
	private String Usuario;
	private Empresa empresa; //se esquecer de declarar aqui fica null

	@OneToMany(mappedBy="funcionario", cascade=CascadeType.ALL,fetch=FetchType.EAGER)
	private List<UsuarioPeriodoTrabalho> usuarioperiodosdetrabalho = new ArrayList<>();

	@OneToMany(mappedBy="funcionario", cascade=CascadeType.ALL,fetch=FetchType.EAGER)
	private Set<UsuarioPeriodoEventual> usuarioperiodoeventual = new HashSet<>();
	
	@OneToMany(mappedBy="funcionario", cascade=CascadeType.ALL,fetch=FetchType.EAGER)
	private Set<UsuarioPeriodoSuspenso> usuarioperiodosuspenso = new HashSet<>();
	public Funcionario() {
	}	

	public Funcionario(Integer id  , String tipopessoa , String documento , String nome   , String usuinc
		      , String usualt ,String usuexc  ,Date dtaltera   ,Date dtinclui    , Date dtexclui
		      ,Empresa empresa  ,List<Endereco> enderecos   ,List<Contato> contatos    ,String tiporelacionamento
		      , Integer empresaid,List<Banco> bancos, Date nascimentoData, String nascimentoCidade, String nascimentoUf, String cTPS, String rG,
			String pIS, String estadoCivil, String cNH, Date cNHVencimento, String nomePai, String nomeMae,
			Date admissão, Date demissao, String registro, String salario, String usuario) {
		super(id,tipopessoa, documento,nome, usuinc, usualt, usuexc, dtaltera,dtinclui,dtexclui, empresa,enderecos,contatos
				,tiporelacionamento, empresaid,bancos);			
		this.nascimentodata = nascimentoData;
		this.nascimentocidade = nascimentoCidade;
		this.nascimentouf = nascimentoUf;
		this.ctps = cTPS;
		this.rg = rG;
		this.pis = pIS;
		this.estadocivil = estadoCivil;
		this.nomepai = nomePai;
		this.nomemae = nomeMae;
		this.admissao = admissão;
		this.demissao = demissao;
		this.registro = registro;
		this.salario = salario;
		this.Usuario = usuario;
		this.empresa = empresa;
	}

	public Empresa getEmpresa() {
		return empresa;
	}

	public void setEmpresa(Empresa empresa) {
		this.empresa = empresa;
	}		
	
	public Date getNascimentodata() {
		return nascimentodata;
	}

	public void setNascimentodata(Date nascimentodata) {
		this.nascimentodata = nascimentodata;
	}

	public String getNascimentocidade() {
		return nascimentocidade;
	}

	public void setNascimentocidade(String nascimentocidade) {
		this.nascimentocidade = nascimentocidade;
	}

	public String getNascimentouf() {
		return nascimentouf;
	}

	public void setNascimentouf(String nascimentouf) {
		this.nascimentouf = nascimentouf;
	}

	public String getCtps() {
		return ctps;
	}

	public void setCtps(String ctps) {
		this.ctps = ctps;
	}

	public String getRg() {
		return rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public String getPis() {
		return pis;
	}

	public void setPis(String pis) {
		this.pis = pis;
	}

	public String getEstadocivil() {
		return estadocivil;
	}

	public void setEstadocivil(String estadocivil) {
		this.estadocivil = estadocivil;
	}

	public String getNomepai() {
		return nomepai;
	}

	public void setNomepai(String nomepai) {
		this.nomepai = nomepai;
	}

	public String getNomemae() {
		return nomemae;
	}

	public void setNomemae(String nomemae) {
		this.nomemae = nomemae;
	}

	public Date getAdmissao() {
		return admissao;
	}

	public void setAdmissao(Date admissao) {
		this.admissao = admissao;
	}

	public Date getDemissao() {
		return demissao;
	}

	public void setDemissao(Date demissao) {
		this.demissao = demissao;
	}

	public String getRegistro() {
		return registro;
	}

	public void setRegistro(String registro) {
		this.registro = registro;
	}

	public String getSalario() {
		return salario;
	}

	public void setSalario(String salario) {
		this.salario = salario;
	}

	public String getUsuario() {
		return Usuario;
	}

	public void setUsuario(String usuario) {
		Usuario = usuario;
	}

	public List<UsuarioPeriodoTrabalho> getUsuarioperiodosdetrabalho() {
		return usuarioperiodosdetrabalho;
	}

	public void setUsuarioperiodosdetrabalho(List<UsuarioPeriodoTrabalho> usuarioperiodosdetrabalho) {
		this.usuarioperiodosdetrabalho = usuarioperiodosdetrabalho;
	}

	public Set<UsuarioPeriodoEventual> getUsuarioperiodoeventual() {
		return usuarioperiodoeventual;
	}

	public void setUsuarioperiodoeventual(Set<UsuarioPeriodoEventual> usuarioperiodoeventual) {
		this.usuarioperiodoeventual = usuarioperiodoeventual;
	}

	public Set<UsuarioPeriodoSuspenso> getUsuarioperiodosuspenso() {
		return usuarioperiodosuspenso;
	}

	public void setUsuarioperiodosuspenso(Set<UsuarioPeriodoSuspenso> usuarioperiodosuspenso) {
		this.usuarioperiodosuspenso = usuarioperiodosuspenso;
	}





	
}