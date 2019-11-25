package com.velocinotech.erp02.domain;

import java.io.Serializable;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@javax.persistence.Table(indexes = { 
  @Index(name = "INDPED1", columnList = ( "idempresa, status, clientenome" ))
, @Index(name = "INDPED2", columnList = ( "idempresa" ))
, @Index(name = "INDPED3", columnList = ( "status" ))  
, @Index(name = "INDPED4", columnList = ( "clientenome" ))
  
})
public class Pedido implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;		
	private String status;
	private String clientenome;
	private Integer idempresa;
	private  String usuinc;
	private  String usualt;
	@JsonFormat(pattern="dd/MM/yyyy")
	private Date dtinclui;	
	@JsonFormat(pattern="dd/MM/yyyy")	
	private  Date dtaltera;
	@JsonFormat(pattern="dd/MM/yyyy")	
	private  Date dtfinaliza;	
	
	//@JsonBackReference
	@ManyToOne
	@JoinColumn(name="cliente_id")
	private Cliente cliente;

	//@JsonBackReference
	@ManyToOne
	@JoinColumn(name="vendedor_id")
	private Vendedor vendedor;
	
	@OneToOne(cascade=CascadeType.ALL, mappedBy="pedido")
	private Pagamento pagamento;
	
	@ManyToOne
	@JoinColumn(name="endereco_de_entrega_id")
	private Endereco enderecoDeEntrega;

	@OneToMany(mappedBy="pedido", fetch = FetchType.LAZY)
	private List<ItemPedido> itens = new ArrayList<>();	
	
	public Pedido() {
	}

	public Pedido(Integer id, Date dtinclui, Endereco enderecoDeEntrega, String status, Cliente cliente, Vendedor vendedor
			, String clientenome, Integer idempresa, Date dtfinaliza, Date dtaltera, String usuinc, String usualt) {
		super();
		this.id = id;
		this.dtinclui = dtinclui;
		this.enderecoDeEntrega = enderecoDeEntrega;
		this.status = status;
		this.cliente = cliente;
		this.vendedor = vendedor;
		this.clientenome = clientenome;
		this.idempresa = idempresa;
		this.dtfinaliza = dtfinaliza;
		this.dtaltera = dtaltera;
		this.usuinc = usuinc;
		this.usualt = usualt;
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

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public Vendedor getVendedor() {
		return vendedor;
	}

	public void setVendedor(Vendedor vendedor) {
		this.vendedor = vendedor;
	}

	public Pagamento getPagamento() {
		return pagamento;
	}

	public void setPagamento(Pagamento pagamento) {
		this.pagamento = pagamento;
	}

	public Endereco getEnderecoDeEntrega() {
		return enderecoDeEntrega;
	}

	public void setEnderecoDeEntrega(Endereco enderecoDeEntrega) {
		this.enderecoDeEntrega = enderecoDeEntrega;
	}

	public List<ItemPedido> getItens() {
		return itens;
	}

	public void setItens(List<ItemPedido> itens) {
		this.itens = itens;
	}

	public double getValorTotal() {
		double soma = 0.0;
		for (ItemPedido ip : itens) {
			soma = soma + ip.getSubTotal();
		}
		return soma;
	}

	public String getClientenome() {
		return clientenome;
	}

	public void setClientenome(String clientenome) {
		this.clientenome = clientenome;
	}

	public Integer getIdempresa() {
		return idempresa;
	}

	public void setIdempresa(Integer idempresa) {
		this.idempresa = idempresa;
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
		Pedido other = (Pedido) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
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

	public Date getDtinclui() {
		return dtinclui;
	}

	public void setDtinclui(Date dtinclui) {
		this.dtinclui = dtinclui;
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

	@Override
	public String toString() {
		NumberFormat nf = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss");
		StringBuilder builder = new StringBuilder();
		builder.append("Pedido número: ");
		builder.append(getId());
		builder.append(", Dtinclui: ");
		builder.append(sdf.format(getDtinclui()));
		builder.append(", Usuario: ");
		builder.append(", Situação do pagamento: ");
		builder.append(getPagamento().getEstado().getDescricao());
		builder.append("\nDetalhes:\n");	
		for (ItemPedido ip : getItens()) {
			builder.append(ip.toString());
		}

		builder.append("Valor total: ");
		builder.append(nf.format(getValorTotal()));
		return builder.toString();
	}
}