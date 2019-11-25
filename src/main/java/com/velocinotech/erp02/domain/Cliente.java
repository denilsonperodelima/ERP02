package com.velocinotech.erp02.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonTypeName;

@Entity
@JsonTypeName("cliente")
public class Cliente extends Pessoa  {

	private static final long serialVersionUID = 1L;
	
	private String inscestadual;
	private String inscmunicipal;
	private String nomefantasia;
	private  String endereconf;
	private  String bairronf;
	private  String cepnf;
	private  String cidadenf;
	private  String ufnf;	
	private Empresa empresa;

	
	//@JsonBackReference
	@OneToMany(mappedBy="cliente", fetch = FetchType.LAZY)
	private List<Pedido> pedidos = new ArrayList<>();
	public Cliente() {
	}
	
	public Cliente(Integer id  , String tipopessoa , String documento , String nome   , String usuinc
			      , String usualt ,String usuexc  ,Date dtaltera   ,Date dtinclui    , Date dtexclui
			      ,Empresa empresa  ,List<Endereco> enderecos   ,List<Contato> contatos    ,String tiporelacionamento
			      , Integer empresaid,List<Banco> bancos,String inscestadual, String inscmunicipal, String nomefantasia
		          , String endereconf, String bairronf, String cepnf, String cidadenf, String ufnf,List<Pedido> pedidos ) {			
		super(id,tipopessoa, documento,nome, usuinc, usualt, usuexc, dtaltera,dtinclui,dtexclui, empresa,enderecos,contatos
				,tiporelacionamento, empresaid,bancos);		
		
		this.inscestadual = inscestadual;
		this.inscmunicipal = inscmunicipal;
		this.nomefantasia = nomefantasia;
		this.endereconf = endereconf;
		this.bairronf = bairronf;
		this.cepnf = cepnf;
		this.cidadenf = cidadenf;
		this.ufnf = ufnf;
		this.empresa = empresa;
		this.pedidos = pedidos;
	}

	public String getInscestadual() {
		return inscestadual;
	}

	public void setInscestadual(String inscestadual) {
		this.inscestadual = inscestadual;
	}

	public String getInscmunicipal() {
		return inscmunicipal;
	}

	public void setInscmunicipal(String inscmunicipal) {
		this.inscmunicipal = inscmunicipal;
	}

	public String getNomefantasia() {
		return nomefantasia;
	}

	public void setNomefantasia(String nomefantasia) {
		this.nomefantasia = nomefantasia;
	}

	public Empresa getEmpresa() {
		return empresa;
	}

	public void setEmpresa(Empresa empresa) {
		this.empresa = empresa;
	}		
	
	public String getEndereconf() {
		return endereconf;
	}

	public void setEndereconf(String endereconf) {
		this.endereconf = endereconf;
	}

	public String getBairronf() {
		return bairronf;
	}

	public void setBairronf(String bairronf) {
		this.bairronf = bairronf;
	}

	public String getCepnf() {
		return cepnf;
	}

	public void setCepnf(String cepnf) {
		this.cepnf = cepnf;
	}

	public String getCidadenf() {
		return cidadenf;
	}

	public void setCidadenf(String cidadenf) {
		this.cidadenf = cidadenf;
	}

	public String getUfnf() {
		return ufnf;
	}

	public void setUfnf(String ufnf) {
		this.ufnf = ufnf;
	}

	public List<Pedido> getPedidos() {
		return pedidos;
	}

	public void setPedidos(List<Pedido> pedidos) {
		this.pedidos = pedidos;
	}	
	
}