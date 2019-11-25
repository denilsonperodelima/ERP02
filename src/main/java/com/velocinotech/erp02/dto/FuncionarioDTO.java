package com.velocinotech.erp02.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.velocinotech.erp02.domain.Banco;
import com.velocinotech.erp02.domain.Contato;
import com.velocinotech.erp02.domain.Endereco;
import com.velocinotech.erp02.domain.Funcionario;
import com.velocinotech.erp02.domain.UsuarioPeriodoEventual;
import com.velocinotech.erp02.domain.UsuarioPeriodoSuspenso;
import com.velocinotech.erp02.domain.UsuarioPeriodoTrabalho;
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "@type")
public class FuncionarioDTO extends PessoaDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer id;
	private  String tiporelacionamento;		
	private String tipopessoa;
	private String documento;
	private String nome;
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

	
	
	private String usuinc;
	private String usualt;
	@JsonFormat(pattern="dd/MM/yyyy")	
	private Date dtaltera;
	@JsonFormat(pattern="dd/MM/yyyy")	
	private Date dtinclui;	
	@JsonFormat(pattern="dd/MM/yyyy")	
	private Date dtexclui;
	private String usuexc;		
	List<Endereco> enderecos;
	List<Contato> contatos;
	List<Banco> bancos;
	List<UsuarioPeriodoTrabalho> usuarioperiodosdetrabalho;
	Set<UsuarioPeriodoEventual> usuarioperiodoeventual;
	Set<UsuarioPeriodoSuspenso> usuarioperiodosuspenso;

	public FuncionarioDTO() {
	}
	
	public FuncionarioDTO(Funcionario obj) {		
		id = obj.getId();
		tipopessoa = obj.getTipopessoa();
		documento = obj.getDocumento();
		enderecos = obj.getEnderecos();
		contatos = obj.getContatos();
		bancos = obj.getBancos();
		nome = obj.getNome();
		usuinc = obj.getUsuinc();
		usualt = obj.getUsualt();
		dtinclui = obj.getDtinclui();
		dtaltera = obj.getDtaltera();
		dtexclui = obj.getDtexclui();
		usuexc = obj.getUsuexc();	
		nascimentodata = obj.getNascimentodata();
		nascimentocidade = obj.getNascimentocidade();
		nascimentouf = obj.getNascimentouf();
		ctps = obj.getCtps();
		rg = obj.getRg();
		pis = obj.getPis();
		estadocivil = obj.getEstadocivil();
		nomepai = obj.getNomepai();
		nomemae = obj.getNomemae();
		admissao = obj.getAdmissao();
		demissao = obj.getDemissao();
		registro = obj.getRegistro();
		
		tiporelacionamento = obj.getTiporelacionamento();	
		usuarioperiodosdetrabalho = obj.getUsuarioperiodosdetrabalho();
		usuarioperiodoeventual = obj.getUsuarioperiodoeventual();
		usuarioperiodosuspenso =  obj.getUsuarioperiodosuspenso();

	}

	public List<Endereco> getEnderecos() {
		return enderecos;
	}

	public void setEnderecos(List<Endereco> enderecos) {
		this.enderecos = enderecos;
	}

	public List<Contato> getContatos() {
		return contatos;
	}

	public void setContatos(List<Contato> contatos) {
		this.contatos = contatos;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTipopessoa() {
		return tipopessoa;
	}

	public void setTipopessoa(String tipopessoa) {
		this.tipopessoa = tipopessoa;
	}

	public String getDocumento() {
		return documento;
	}

	public void setDocumento(String documento) {
		this.documento = documento;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getUsuinc() {
		return usuinc;
	}

	public void setUsuinc(String usuinc) {
		this.usuinc = usuinc;
	}

	public String getUsualt() {
		return usualt;
	}

	public void setUsualt(String usualt) {
		this.usualt = usualt;
	}

	public Date getDtaltera() {
		return dtaltera;
	}

	public void setDtaltera(Date dtaltera) {
		this.dtaltera = dtaltera;
	}

	public Date getDtinclui() {
		return dtinclui;
	}

	public void setDtinclui(Date dtinclui) {
		this.dtinclui = dtinclui;
	}

	public Date getDtexclui() {
		return dtexclui;
	}

	public void setDtexclui(Date dtexclui) {
		this.dtexclui = dtexclui;
	}

	public String getUsuexc() {
		return usuexc;
	}

	public void setUsuexc(String usuexc) {
		this.usuexc = usuexc;
	}

	public String getTiporelacionamento() {
		return tiporelacionamento;
	}

	public void setTiporelacionamento(String tiporelacionamento) {
		this.tiporelacionamento = tiporelacionamento;
	}

	public List<Banco> getBancos() {
		return bancos;
	}

	public void setBancos(List<Banco> bancos) {
		this.bancos = bancos;
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


	
	
}