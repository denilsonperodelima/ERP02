package com.velocinotech.erp02.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.velocinotech.erp02.domain.ItemPedido;
import com.velocinotech.erp02.domain.Pedido;
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "@type")
public class PedidoItensDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer id;
	@JsonFormat(pattern="dd/MM/yyyy")	
	private Date dtinclui;	
	private String status;	
	private Integer idcliente;
	private String nomecliente;
	private String documento;
	private String cidade;
	private String uf;
	private Integer idvendedor;
	private String nomevendedor;
	private List<ItemPedido> itens;
	private  String usuinc;
	private  String usualt;
	@JsonFormat(pattern="dd/MM/yyyy")	
	private  Date dtaltera;
	@JsonFormat(pattern="dd/MM/yyyy")	
	private  Date dtfinaliza;
    
	public PedidoItensDTO() {
	}
	
	public PedidoItensDTO(Pedido obj) {		
		id = obj.getId();
		dtinclui = obj.getDtinclui();
		status = obj.getStatus();
		itens = obj.getItens();
		idcliente = obj.getCliente().getId();
		nomecliente = obj.getCliente().getNome();
		documento = obj.getCliente().getDocumento();
		cidade = obj.getCliente().getCidadenf();
		uf = obj.getCliente().getUfnf();
		idvendedor = obj.getVendedor().getId();
		nomevendedor = obj.getVendedor().getNome();
		dtaltera = obj.getDtaltera();
		dtfinaliza = obj.getDtfinaliza();
		usuinc = obj.getUsuinc();
		usualt = obj.getUsualt();
	}

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<ItemPedido> getItens() {
		return itens;
	}

	public void setItens(List<ItemPedido> itens) {
		this.itens = itens;
	}

	public Integer getIdcliente() {
		return idcliente;
	}

	public void setIdcliente(Integer idcliente) {
		this.idcliente = idcliente;
	}

	public String getNomecliente() {
		return nomecliente;
	}

	public void setNomecliente(String nomecliente) {
		this.nomecliente = nomecliente;
	}

	public Integer getIdvendedor() {
		return idvendedor;
	}

	public void setIdvendedor(Integer idvendedor) {
		this.idvendedor = idvendedor;
	}

	public String getNomevendedor() {
		return nomevendedor;
	}

	public void setNomevendedor(String nomevendedor) {
		this.nomevendedor = nomevendedor;
	}

	public String getDocumento() {
		return documento;
	}

	public void setDocumento(String documento) {
		this.documento = documento;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getUf() {
		return uf;
	}

	public void setUf(String uf) {
		this.uf = uf;
	}

	public Date getDtinclui() {
		return dtinclui;
	}

	public void setDtinclui(Date dtinclui) {
		this.dtinclui = dtinclui;
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

	public Date getDtfinaliza() {
		return dtfinaliza;
	}

	public void setDtfinaliza(Date dtfinaliza) {
		this.dtfinaliza = dtfinaliza;
	}


	
}