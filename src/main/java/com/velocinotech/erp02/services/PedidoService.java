package com.velocinotech.erp02.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.velocinotech.erp02.domain.ItemPedido;
import com.velocinotech.erp02.domain.PagamentoComBoleto;
import com.velocinotech.erp02.domain.Pedido;
import com.velocinotech.erp02.domain.Produto;
import com.velocinotech.erp02.domain.enums.EstadoPagamento;
import com.velocinotech.erp02.repositories.ItemPedidoRepository;
import com.velocinotech.erp02.repositories.PagamentoRepository;
import com.velocinotech.erp02.repositories.PedidoRepository;
import com.velocinotech.erp02.resources.utils.Micelaneas;
import com.velocinotech.erp02.services.exceptions.ObjectNotFoundException;

@Service
public class PedidoService {
	
	@Autowired
	private PedidoRepository repo;
	
	@Autowired
	private BoletoService boletoService;
	
	@Autowired
	private PagamentoRepository pagamentoRepository;
	
	@Autowired
	private ItemPedidoRepository itemPedidoRepository;
	
	@Autowired
	private Micelaneas micelaneas;

	
	//@Autowired
	//private ProdutoRepository produtoRepository;

	
	//@Autowired
	//private EmailService emailService;
	

	


	@Transactional
	public Pedido insert(Pedido obj) {

		if(obj.getId() == null) {
			obj.setDtinclui(micelaneas.dataDoDia());
			obj.setDtaltera(null);
		} else {
			obj.setDtaltera(micelaneas.dataDoDia());
			
		}

		obj.setStatus("ANDAMENTO");
		obj.setDtfinaliza(null);
		
		repo.save(obj);

		for (ItemPedido itens : obj.getItens()) {
			itens.setDesconto(0.0);
			itens.setPedido(obj);	
		}
		itemPedidoRepository.save(obj.getItens());

		//emailService.sendOrderConfirmationEmail(obj);
		return obj;
	}
	
	
	@Transactional
	public Pedido insertxx(Pedido obj) {
		obj.setId(null);
		obj.setDtinclui(new Date());
		obj.getPagamento().setEstado(EstadoPagamento.PENDENTE);
		obj.getPagamento().setPedido(obj);
		if (obj.getPagamento() instanceof PagamentoComBoleto) {
			PagamentoComBoleto pagto = (PagamentoComBoleto) obj.getPagamento();
			boletoService.preencherPagamentoComBoleto(pagto, obj.getDtinclui());
		}
		obj = repo.save(obj);
		pagamentoRepository.save(obj.getPagamento());
		for (ItemPedido ip : obj.getItens()) {
			ip.setDesconto(0.0);
			//ip.setProduto(produtoRepository.findOne(ip.getProduto().getId()));
			ip.setPedido(obj);
		}
		itemPedidoRepository.save(obj.getItens());
		//emailService.sendOrderConfirmationEmail(obj);
		return obj;
	}
	public Pedido find(Integer id) {		
		Pedido obj = repo.findOne(id);
		if (obj == null) {
			throw new ObjectNotFoundException(
					"Objeto não encontrado! Id: " + id + ", Tipo: " + Produto.class.getName());
		}
		return obj;
	}
	public List<Pedido> findbyname(String status, String nome, Integer idempresa) {
		List<Pedido> pedidos = repo.FindNomeLike(status, nome, idempresa);
		return pedidos;
	}

	public Pedido finalizar(Pedido obj) {
		obj.setStatus("FINALIZADO");
		obj.setDtfinaliza(micelaneas.dataDoDia());
		obj.setDtaltera(micelaneas.dataDoDia());
		repo.save(obj);			
		return obj;
	}
}