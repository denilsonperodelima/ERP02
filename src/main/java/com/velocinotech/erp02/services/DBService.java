package com.velocinotech.erp02.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.velocinotech.erp02.domain.Banco;
import com.velocinotech.erp02.domain.Cliente;
import com.velocinotech.erp02.domain.Contato;
import com.velocinotech.erp02.domain.Contatotipo;
import com.velocinotech.erp02.domain.Empresa;
import com.velocinotech.erp02.domain.Endereco;
import com.velocinotech.erp02.domain.Fornecedor;
import com.velocinotech.erp02.domain.Funcionario;
import com.velocinotech.erp02.domain.Grupo;
import com.velocinotech.erp02.domain.ItemPedido;
import com.velocinotech.erp02.domain.Pagamento;
import com.velocinotech.erp02.domain.PagamentoComBoleto;
import com.velocinotech.erp02.domain.PagamentoComCartao;
import com.velocinotech.erp02.domain.Pedido;
import com.velocinotech.erp02.domain.Produto;
import com.velocinotech.erp02.domain.Subgrupo;
import com.velocinotech.erp02.domain.Subgrupoitem;
import com.velocinotech.erp02.domain.Usuario;
import com.velocinotech.erp02.domain.UsuarioPeriodoEventual;
import com.velocinotech.erp02.domain.UsuarioPeriodoSuspenso;
import com.velocinotech.erp02.domain.UsuarioPeriodoTrabalho;
import com.velocinotech.erp02.domain.Vendedor;
import com.velocinotech.erp02.domain.enums.EstadoPagamento;
import com.velocinotech.erp02.domain.enums.Perfil;
import com.velocinotech.erp02.domain.enums.TipoCliente;
import com.velocinotech.erp02.repositories.BancoRepository;
import com.velocinotech.erp02.repositories.ClienteRepository;
import com.velocinotech.erp02.repositories.ContatoRepository;
import com.velocinotech.erp02.repositories.ContatotipoRepository;
import com.velocinotech.erp02.repositories.EmpresaRepository;
import com.velocinotech.erp02.repositories.EnderecoRepository;
import com.velocinotech.erp02.repositories.FornecedorRepository;
import com.velocinotech.erp02.repositories.FuncionarioRepository;
import com.velocinotech.erp02.repositories.GrupoRepository;
import com.velocinotech.erp02.repositories.ItemPedidoRepository;
import com.velocinotech.erp02.repositories.PedidoRepository;
import com.velocinotech.erp02.repositories.ProdutoRepository;
import com.velocinotech.erp02.repositories.UsuarioRepository;
import com.velocinotech.erp02.repositories.VendedorRepository;
import com.velocinotech.erp02.resources.utils.Micelaneas;;

@Service
public class DBService {

	@Autowired
	private BCryptPasswordEncoder pe;

	@Autowired
	private ProdutoRepository produtoRepository;
	@Autowired
	private FornecedorRepository fornecedorRepository;
	@Autowired
	private UsuarioRepository usuariorepository;
	@Autowired
	private EnderecoRepository enderecoRepository;
	@Autowired
	
	private BancoRepository bancoRepository;
	@Autowired
	private VendedorRepository vendedorRepository;
	@Autowired	
	private EmpresaRepository empresaRepository;	
	@Autowired
	private ContatoRepository contatoRepository;
	
	@Autowired
	private ContatotipoRepository contatotipoRepository;
	
	@Autowired
	private ItemPedidoRepository itempedidoRepository;	
	
	@Autowired
	private ClienteRepository clienteRepository;	
	
	@Autowired
	private GrupoRepository grupoRepository;

	@Autowired
	private FuncionarioRepository funcionarioRepository;

	@Autowired
	private PedidoRepository pedidoRepository;
	
	@Autowired
	private Micelaneas micelaneas;

	
	public void instantiateTestDatabase() throws ParseException {
		
		SimpleDateFormat sdf10 = new SimpleDateFormat("dd/MM/yyyy HH:mm");
		
		Empresa empvelo = new Empresa(null, "Velocino Tech Ltda" ,"57.114.211/0001-72", "Rua dos Coqueiros, 300", "02221-000", "São Paulo",
				"SP", "ATIVA", "Contato1",  "Contato2",  "Contato3", null,"JURIDICA");		
		empresaRepository.save(empvelo);
		
		Empresa empmariza = new Empresa(null, "Empresa da Mariza" ,"33.398.058/0001-94", "Rua da Telefonica, 45", "03344-567", "São Paulo",
				"SP", "ATIVA", "Contato1",  "Contato2",  "Contato3", null,"JURIDICA");		
		empresaRepository.save(empmariza);
		
		Empresa empotavio = new Empresa(null, "Empresa Tavão" ,"00.358.214/0001-34", "Av. do Cursino, 45", "04296-000", "São Paulo",
				"SP", "ATIVA", "Contato1",  "Contato2",  "Contato3", null,"JURIDICA");		
		empresaRepository.save(empotavio);
		
		Empresa empnilton = new Empresa(null, "Empresa Nilton Peró" ,"63.233.818/0001-74", "Av. do Cursino, 45", "04296-000", "São Paulo",
				"SP", "ATIVA", "Contato1",  "Contato2",  "Contato3", null,"JURIDICA");		
		empresaRepository.save(empnilton);

		Fornecedor forana1 = new Fornecedor (null, "JURIDICA", "83.869.366/0001-29", "NOME FORNECEDOR 83.869.366/0001-29"
				,"usuinc","usualt", "usuexc"
				,sdf10.parse("03/10/2019 10:32"),sdf10.parse("03/10/2019 10:32"),sdf10.parse("03/10/2019 10:32")
				,empmariza, null, null, "FORNECEDOR",1,null,"estadual", "municipal", "fantasia");

		gerarProdutosEmpresa(empvelo, forana1, 10);
		gerarProdutosEmpresa(empmariza, forana1, 10);
		gerarProdutosEmpresa(empotavio, forana1, 10);
		gerarProdutosEmpresa(empnilton, forana1, 10);
		
		Banco banco1 = new Banco(null,"237","ITAU","CONTA 01043", "OBS",forana1);
		Banco banco2 = new Banco(null,"123","BRADESCO","CONTA XXXXXX", "OBS", forana1);
		bancoRepository.save(Arrays.asList(banco1,banco2));
		
		Endereco e1forana = new Endereco(null, "Rua Flores", "300", "Apto 303", "Jardim", "38220834", forana1, "NOTA FISCAL","SÃO PAULO", "UF");
		Endereco e2forana = new Endereco(null, "Avenida Matos", "105", "Sala 800", "Centro", "38777012", forana1, "NOTA FISCAL","SÃO PAULO", "UF");
		Endereco e3forana = new Endereco(null, "Avenida Floriano", "2106", null, "Centro", "281777012", forana1, "NOTA FISCAL","SÃO PAULO", "UF");

		enderecoRepository.save(Arrays.asList(e1forana, e2forana, e3forana));
		
		Contato ct1forana = new Contato(null, "COMERCIAL", "Jose da Silva", forana1, null);
		Contato ct2forana = new Contato(null, "FINANCEIRO", "Roberto Carlos", forana1, null);
		Contato ct3forana = new Contato(null, "ADMINISTRATIVO", "Felix", forana1, null);
		
		contatoRepository.save(Arrays.asList(ct1forana,ct2forana, ct3forana));
		
		//****fim fornecedor
		
		//****inicio vendedor

		Produto p2 = new Produto (null,"Computador", "Marca boademais","UNIDADE",10.00,9.01, 12.50, "ncm computador", "localização estoque computador"
 				, 25, 45, "codigo ean computador",55.66, 11.12,"origem computador", "ATIVO","PRODUTO"
 				,"OBSERVAÇÃO MINHA TERRA TEM PALMEIRAS ONDE CANTA O SABIA","COMPUTADOR","DESK TOP","DELL","VERMELHO",""
 				,"usuincproduto", "usuialtroduto","usuialtexroduto",sdf10.parse("03/10/2019 10:32"),sdf10.parse("03/10/2019 10:32"), null,empvelo.getId());		
		
		Vendedor vendana1 = new Vendedor (null, "FISICA", "994.119.400-99", "VEND 994"
				,"usuinc","usualt", "usuexc"
				,sdf10.parse("03/10/2019 10:32"),sdf10.parse("03/10/2019 10:32"),sdf10.parse("03/10/2019 10:32")
				,empvelo, null, null, "VENDEDOR",1,null,"ATIVO", "EXTERNO","ana@gmail.com");

		//vendana1.getBancos().addAll(Arrays.asList(bcvend1,bcvend2));
		vendana1.getProdutos().addAll(Arrays.asList(p2));
		//p1.getVendedores().addAll(Arrays.asList(vendana1));
		
		vendedorRepository.save(vendana1);
		produtoRepository.save(Arrays.asList(p2));


		Banco bcvend1 = new Banco(null,"237","ITAU - vend1","CONTA 01043", "OBS",vendana1);
		Banco bcvend2 = new Banco(null,"123","BRADESCO vend1","CONTA XXXXXX", "OBS",vendana1);
		
		Produto p3 = new Produto (null,"AET", "Licença Viagem Anual","unidade",10.00,9.01, 12.50, "ncm computador", "localização estoque computador"
 				, 25, 45, "codigo ean computador",55.66, 11.12,"origem computador", "ATIVO","SERVIÇO"
 				,"OBSERVAÇÃO XX","AET","DSV","ANUAL",null,null
 				,"usuincproduto", "usuialtroduto","usuialtexroduto",sdf10.parse("20/03/2019 10:32"),sdf10.parse("03/10/2019 10:32"), null,empvelo.getId());		
		
		Vendedor vendmaria1 = new Vendedor (null, "FISICA", "862.263.080-36", "VEND 862"
				,"usuinc","usualt", "usuexc"
				,sdf10.parse("03/10/2019 10:32"),sdf10.parse("03/10/2019 10:32"),sdf10.parse("03/10/2019 10:32")
				,empvelo, null, null, "VENDEDOR",1,null,"ATIVO", "EXTERNO","maria@gmail.com");

		vendmaria1.getProdutos().addAll(Arrays.asList(p3));
		//p1.getVendedores().addAll(Arrays.asList(vendmaria1));
		
		vendedorRepository.save(vendmaria1);

		Banco bcvendmaria1 = new Banco(null,"237","ITAU - vend1","CONTA 01043", "OBS",vendmaria1);
		Banco bcvendmaria2 = new Banco(null,"123","BRADESCO vend1","CONTA XXXXXX", "OBS",vendmaria1);
		bancoRepository.save(Arrays.asList(bcvendmaria1,bcvendmaria2));
		
		
		Produto p4 = new Produto (null,"AET", "Licença viagem","unidade",10.00,9.01, 12.50, "ncm computador", "localização estoque computador"
 				, 25, 45, "codigo ean computador",55.66, 11.12,"origem computador", "ATIVO","SERVIÇO"
 				,"OBSERVAÇÃO XX","AET","DER","VIAGEM",null,null
 				,"usuincproduto", "usuialtroduto","usuialtexroduto",sdf10.parse("20/03/2019 10:32"),sdf10.parse("03/10/2019 10:32"), null,empvelo.getId());		
		
		Vendedor vendmaria2 = new Vendedor (null, "FISICA", "639.648.590-79", "VENDEDOR 862.263.080-36"
				,"usuinc","usualt", "usuexc"
				,sdf10.parse("03/10/2019 10:32"),sdf10.parse("03/10/2019 10:32"),sdf10.parse("03/10/2019 10:32")
				,empotavio, null, null, "VENDEDOR",1,null,"ATIVO", "EXTERNO","ana@gmail.com");

		vendmaria2.getProdutos().addAll(Arrays.asList(p4,p3));
		//p1.getVendedores().addAll(Arrays.asList(vendmaria2));
		
		vendedorRepository.save(vendmaria2);
		produtoRepository.save(Arrays.asList(p4));


		Banco bcvendmaria21 = new Banco(null,"237","ITAU - bcvendmaria21","CONTA 01043", "OBS",vendmaria2);
		Banco bcvendmaria22 = new Banco(null,"123","BRADESCO bcvendmaria22","CONTA XXXXXX", "OBS",vendmaria2);
		bancoRepository.save(Arrays.asList(bcvendmaria21,bcvendmaria22));

		bancoRepository.save(Arrays.asList(bcvend1,bcvend2));
		
		produtoRepository.save(Arrays.asList(p2,p3,p4));
		
		//****fim vendedor

		Cliente clix = new Cliente(null, "JURIDICA", "83.869.366/0001-29", "CLI 83869", "USUINCX", "USUALT","USUEXCL"
				,sdf10.parse("03/10/2019 10:32"),sdf10.parse("03/10/2019 10:32"), null,empvelo,null,null,"CLIENTE",1,null
                ,"INCESTADUAL_88", "INCMUNICIPAL_77", " NOME FANTASIA", "Endereço nf 83.869.366/0001-29",
                "Bairro nr 83.869.366/0001-29", "01122-333", "Rio de Janeiro", "RJ",null);
		
		Cliente clix2 = new Cliente(null, "JURIDICA", "88.578.167/0001-85", "CLI 88578", "USUINCX", "USUALT","USUEXCL"
				,sdf10.parse("03/10/2019 10:32"),sdf10.parse("03/10/2019 10:32"), null,empvelo,null,null,"CLIENTE",1,null
                ,"INCESTADUAL_88", "INCMUNICIPAL_77", " NOME FANTASIA", "Endereço nf 88.578.167/0001-85",
                "Bairro nr 88.578.167/0001-85", "01122-333", "Curitiba", "PR",null);		
		clienteRepository.save(Arrays.asList(clix, clix2));
				
		SimpleDateFormat sdf0 = new SimpleDateFormat("dd/MM/yyyy HH:mm");
		
		clienteRepository.save(Arrays.asList(clix, clix2));
		
		//inicio funcionário 

		Funcionario func1 = new Funcionario(null, "FISICA", "376.570.990-54", "Sonia Baixinha", "USUINCX", "USUALT","USUEXCL"
				,sdf10.parse("03/10/2019 10:32"),sdf10.parse("03/10/2019 10:32"), null,empmariza,null,null,"FUNCIONARIO",empmariza.getId(),null
				,sdf10.parse("24/02/1997 10:32"), "Ipauçu", "SP", "CTPS 376.570.990-54",
                "RG 376.570.990-54", "PIS 376.570.990-54", "CASADO", "CNH 376.570.990-54",null,"NOME DO PAI PIS 376.570.990-54",
                "NOME DA MAES PIS 376.570.990-54",sdf10.parse("24/02/1997 10:32"),sdf10.parse("25/02/1997 10:32"),"REGPIS 376.570.990-54",null,null);  

		Usuario usu1 = new Usuario(null, "Sonia Baixinha", "soninha@gmail.com", "023.037.038-16", TipoCliente.PESSOAFISICA, pe.encode(("123")),func1 
				,empmariza.getId(), sdf0.parse("01/10/2020 10:32"), "ATIVO", empmariza.getNome());	
		//usu1.addPerfil(Perfil.ADMIN);
		usu1.addPerfil(Perfil.USUARIOSIS);
		//usu1.addPerfil(Perfil.PAGINACLIENTE);

			
		UsuarioPeriodoTrabalho trab1 = new UsuarioPeriodoTrabalho(null, 1, 0, 14, func1);
		UsuarioPeriodoTrabalho trab2 = new UsuarioPeriodoTrabalho(null, 2, 8, 18, func1);
		UsuarioPeriodoTrabalho trab3 = new UsuarioPeriodoTrabalho(null, 3, 8, 22, func1);
		UsuarioPeriodoTrabalho trab4 = new UsuarioPeriodoTrabalho(null, 4, 8, 18, func1);
		UsuarioPeriodoTrabalho trab5 = new UsuarioPeriodoTrabalho(null, 5, 8, 18, func1);
		UsuarioPeriodoTrabalho trab6 = new UsuarioPeriodoTrabalho(null, 6, 8, 24, func1);
		UsuarioPeriodoTrabalho trab7 = new UsuarioPeriodoTrabalho(null, 7, 14, 18, func1);
		func1.getUsuarioperiodosdetrabalho().addAll(Arrays.asList(trab1, trab2, trab3, trab4, trab5, trab6, trab7));

		
		UsuarioPeriodoEventual eve1 = new UsuarioPeriodoEventual(null, sdf0.parse("22/10/2019 10:32"), sdf0.parse("22/10/2019 10:32"), 8, 14 , func1);
		func1.getUsuarioperiodoeventual().addAll(Arrays.asList(eve1));
		
		UsuarioPeriodoSuspenso sus1 = new UsuarioPeriodoSuspenso(null, sdf0.parse("01/10/2019 10:32"), sdf0.parse("21/10/2019 10:32"), 8, 14, func1);
		func1.getUsuarioperiodosuspenso().addAll(Arrays.asList(sus1));


		funcionarioRepository.save(func1);
		
		Funcionario func1mari = new Funcionario(null, "FISICA", "376.570.990-54", "Mariza Peró", "USUINCX", "USUALT","USUEXCL"
				,sdf10.parse("03/10/2019 10:32"),sdf10.parse("03/10/2019 10:32"), null,empmariza,null,null,"FUNCIONARIO",empmariza.getId(),null
				,sdf10.parse("24/02/1997 10:32"), "Ipauçu", "SP", "CTPS 376.570.990-54",
                "RG 376.570.990-54", "PIS 376.570.990-54", "CASADO", "CNH 376.570.990-54",null,"NOME DO PAI PIS 376.570.990-54",
                "NOME DA MAES PIS 376.570.990-54",sdf10.parse("24/02/1997 10:32"),sdf10.parse("25/02/1997 10:32"),"REGPIS 376.570.990-54",null,null);  

		Usuario usu1mari = new Usuario(null, "Mariza Peró", "mariza@gmail.com", "023.037.038-16", TipoCliente.PESSOAFISICA, pe.encode(("123")),func1mari 
				,empmariza.getId(), sdf0.parse("01/10/2020 10:32"), "ATIVO", empmariza.getNome());	
		usu1mari.addPerfil(Perfil.ADMIN);
		//usu1.addPerfil(Perfil.USUARIOSIS);
		//usu1.addPerfil(Perfil.PAGINACLIENTE);
		
		func1mari.getUsuarios().addAll(Arrays.asList(usu1mari));
		
		funcionarioRepository.save(func1mari);

		
		Endereco e1func = new Endereco(null, "Rua Flores", "300", "Apto 303", "Jardim", "38220834", func1, "RESIDENCIAL","SÃO PAULO", "UF");
		Endereco e2func = new Endereco(null, "Avenida Matos", "105", "Sala 800", "Centro", "38777012", func1, "RESIDENCIAL","SÃO PAULO", "UF");
		Endereco e3func = new Endereco(null, "Avenida Floriano", "2106", null, "Centro", "281777012", func1, "RESIDENCIAL","SÃO PAULO", "UF");
		enderecoRepository.save(Arrays.asList(e1func, e2func, e3func));

		Contato ct1foranax = new Contato(null, "MAE", "Maria Valentina", func1, null);
		Contato ct2foranax = new Contato(null, "PAI", "Roberto Carlos", func1, null);
		Contato ct3foranax = new Contato(null, "PESSOAL", "Felix", func1, null);
		Contato ct4foranax = new Contato(null, "PESSOAL", "Irmao do Felix", func1, null);
		contatoRepository.save(Arrays.asList(ct1foranax,ct2foranax, ct3foranax, ct4foranax));
		
		Contatotipo contatoitens1 = new Contatotipo(null,"E-MAIL","josedasilva@gmail.com",ct1foranax);
		Contatotipo contatoitens2 = new Contatotipo(null,"CELULAR","(11)95651-9917",ct1foranax);
		Contatotipo contatoitens3 = new Contatotipo(null,"TELEFONE","2946-6170",ct1foranax);
		Contatotipo contatoitens4 = new Contatotipo(null,"SITE","www.josedasilva.com.br",ct1foranax);		
		contatotipoRepository.save(Arrays.asList(contatoitens1,contatoitens2, contatoitens3,contatoitens4));
		
		Banco bcvendmaria21x = new Banco(null,"237","ITAU - bcvendmaria21","CONTA 01043", "OBS",func1);
		Banco bcvendmaria22x = new Banco(null,"123","BRADESCO bcvendmaria22","CONTA XXXXXX", "OBS",func1);
		bancoRepository.save(Arrays.asList(bcvendmaria21x,bcvendmaria22x));
		//usuariorepository.save(usu1);
				
		Usuario usu2 = new Usuario(null, "Ana Costa", "ana@gmail.com", "665.059.780-54", TipoCliente.PESSOAFISICA, pe.encode("123"),clix2
				, empmariza.getId(), sdf0.parse("22/10/2019 10:32"), "ativo", empmariza.getNome());
		/*
		UsuarioPeriodoTrabalho trab11 = new UsuarioPeriodoTrabalho(null, 1, 0, 14, usu2);
		UsuarioPeriodoTrabalho trab21 = new UsuarioPeriodoTrabalho(null, 2, 8, 18, usu2);
		UsuarioPeriodoTrabalho trab31 = new UsuarioPeriodoTrabalho(null, 3, 8, 18, usu2);
		UsuarioPeriodoTrabalho trab41 = new UsuarioPeriodoTrabalho(null, 4, 8, 18, usu2);
		UsuarioPeriodoTrabalho trab51 = new UsuarioPeriodoTrabalho(null, 5, 8, 20, usu2);
		UsuarioPeriodoTrabalho trab61 = new UsuarioPeriodoTrabalho(null, 6, 8, 24, usu2);
		UsuarioPeriodoTrabalho trab71 = new UsuarioPeriodoTrabalho(null, 7, 14, 18, usu2);
		usu1.getUsuarioperiodosdetrabalho().addAll(Arrays.asList(trab11, trab21, trab31, trab41, trab51, trab61, trab71));
		
		UsuarioPeriodoEventual eve11 = new UsuarioPeriodoEventual(null, sdf0.parse("22/08/2019 10:32"), sdf0.parse("22/08/2019 10:32"), 8, 14, usu2);
		usu2.getUsuarioperiodoeventual().addAll(Arrays.asList(eve11));
		
		UsuarioPeriodoSuspenso sus11 = new UsuarioPeriodoSuspenso(null, sdf0.parse("22/08/2019 10:32"), sdf0.parse("01/10/2019 10:32"), 8, 14, usu2);
		usu2.getUsuarioperiodosuspenso().addAll(Arrays.asList(sus11));

		usu2.addPerfil(Perfil.ADMIN);
		usu1.addPerfil(Perfil.USUARIOSIS);
        */
		Usuario usu3 = new Usuario(null, "Denilson Peró de Lima", "pero@gmail.com", "023.037.038-16"
                , TipoCliente.PESSOAFISICA, pe.encode("123"),clix, empvelo.getId(), sdf0.parse("22/09/2020  10:32"), "ATIVO", empvelo.getNome());


        usu3.addPerfil(Perfil.SUPER);
        usu3.addPerfil(Perfil.ADMIN);
        usu3.addPerfil(Perfil.PAGINACLIENTELEITURA);
		usu1.addPerfil(Perfil.USUARIOSIS);
         
		usuariorepository.save(Arrays.asList(usu1, usu2, usu3, usu1mari));

		//**fim funcionário
		
		Endereco e1 = new Endereco(null, "Rua Flores", "300", "Apto 303", "Jardim", "38220834", clix, "NOTA FISCAL","SÃO PAULO", "UF");
		Endereco e2 = new Endereco(null, "Avenida Matos", "105", "Sala 800", "Centro", "38777012", clix, "NOTA FISCAL","SÃO PAULO", "UF");
		Endereco e3 = new Endereco(null, "Avenida Floriano", "2106", null, "Centro", "281777012", clix, "NOTA FISCAL","SÃO PAULO", "UF");

		enderecoRepository.save(Arrays.asList(e1, e2, e3));
		
		Contato ct1 = new Contato(null, "COMERCIAL", "Jose da Silva", clix, null);
		Contato ct2 = new Contato(null, "FINANCEIRO", "Roberto Carlos", clix, null);
		Contato ct3 = new Contato(null, "ADMINISTRATIVO", "Felix", clix, null);
		
		contatoRepository.save(Arrays.asList(ct1,ct2, ct3));
		
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");
		
		Pedido ped1 = new Pedido(null, sdf.parse("24/02/2019 10:32"), e1,"ANDAMENTO", clix,vendana1,clix.getNome(),empvelo.getId()
				, null, sdf.parse("30/09/2017 10:32"),"usupedidoinc", "usupedalt");
		Pedido ped2 = new Pedido(null, sdf.parse("10/10/2017 19:35"), e2,"FINALIZADO", clix,vendana1, clix.getNome(), empvelo.getId()
				, sdf.parse("30/10/2019 10:32"), sdf.parse("30/09/2017 10:32"),"usupedidoinc", "usupedalt");
		
		
		Pagamento pagto1 = new PagamentoComCartao(null, EstadoPagamento.QUITADO, ped1, 6);
		ped1.setPagamento(pagto1);
		
		Pagamento pagto2 = new PagamentoComBoleto(null, EstadoPagamento.PENDENTE, ped2, sdf.parse("20/10/2017 00:00"), null);
		ped2.setPagamento(pagto2);
		
		//usu1.getPedidos().addAll(Arrays.asList(ped1, ped2));
		
		pedidoRepository.save(Arrays.asList(ped1, ped2));
		//pagamentoRepository.save(Arrays.asList(pagto1, pagto2));
		
		
		//ItemPedido ip1 = new ItemPedido(null, 0.00, 31.0, 20.90,p1.getId(),p1.getNome(),p1.getUnidade(),ped1);
		ItemPedido ip2 = new ItemPedido(null, 10.00, 33.5, 28.77,p3.getId(),p3.getNome(),p3.getUnidade(),ped1);
		ItemPedido ip3 = new ItemPedido(null, 90.00, 13.3, 12.11,p2.getId(),p2.getNome(),p2.getUnidade(),ped1);
		
		//ItemPedido ip2 = new ItemPedido(null, 0.00, 20, 80.00,ped1, p3);
		//ItemPedido ip3 = new ItemPedido(null,30.00, 44, 800.00,ped2, p2);

		//public ItemPedido(Integer id, Double desconto, Integer quantidade, Double preco, Integer idproduto
		//		, String nomeproduto, String unidade ,Pedido pedido)
		
		//ped1.getItens().addAll(Arrays.asList(ip1, ip2));
		ped2.getItens().addAll(Arrays.asList(ip3));
		
		//p1.getItens().addAll(Arrays.asList(ip1));
		//p2.getItens().addAll(Arrays.asList(ip3));
		//p3.getItens().addAll(Arrays.asList(ip2));
			
		itempedidoRepository.save(Arrays.asList(ip2, ip3));		
		

	
		Grupo PRDXX = new Grupo (null, 1 ,"PRODUTO");	
		 
	    Subgrupo subgrpcateXX1 = new Subgrupo (null,"CATEGORIA", PRDXX);	
	    
		Subgrupoitem subgrpcateitem0 = new Subgrupoitem (null,subgrpcateXX1,"SELECIONAR", null);		
		Subgrupoitem subgrpcateitem1 = new Subgrupoitem (null,subgrpcateXX1,"COMPUTADOR", null);
		Subgrupoitem subgrpcateitem2 = new Subgrupoitem (null,subgrpcateXX1,"IMPRESSORA", null);	
		Subgrupoitem subgrpcateitem3 = new Subgrupoitem (null,subgrpcateXX1,"CELULAR", null);		
		subgrpcateXX1.getSubgrupoitens().addAll(Arrays.asList(subgrpcateitem0,subgrpcateitem1, subgrpcateitem2,subgrpcateitem3));
		
		Subgrupo subgrpprdxx1 = new Subgrupo (null,"TIPO", PRDXX);	
		
		Subgrupoitem subgrpprdxxitem1 = new Subgrupoitem (null,subgrpprdxx1,"PRODUTO", null);
		Subgrupoitem subgrpprdxxitem2 = new Subgrupoitem (null,subgrpprdxx1,"SERVIÇO", null);		
		subgrpprdxx1.getSubgrupoitens().addAll(Arrays.asList(subgrpprdxxitem1, subgrpprdxxitem2));			

		Subgrupo subgrpprdxx2 = new Subgrupo (null,"STATUS", PRDXX);	
		
		Subgrupoitem subgrpprdxxitem1X = new Subgrupoitem (null,subgrpprdxx2,"ATIVO", null);
		Subgrupoitem subgrpprdxxitem2X = new Subgrupoitem (null,subgrpprdxx2,"INATIVO", null);		
		subgrpprdxx2.getSubgrupoitens().addAll(Arrays.asList(subgrpprdxxitem1X, subgrpprdxxitem2X));	

		Subgrupo subgrpprdxx4 = new Subgrupo (null,"UNIDADE", PRDXX);

		Subgrupoitem subgrpprdxxitem1i = new Subgrupoitem (null,subgrpprdxx4,"PEÇA", null);
		Subgrupoitem subgrpprdxxitem2i = new Subgrupoitem (null,subgrpprdxx4,"KG", null);
		Subgrupoitem subgrpprdxxitem3i = new Subgrupoitem (null,subgrpprdxx4,"UNIDADE", null);
		Subgrupoitem subgrpprdxxitem4i = new Subgrupoitem (null,subgrpprdxx4,"ENGRADADO", null);		
		Subgrupoitem subgrpprdxxitem5i = new Subgrupoitem (null,subgrpprdxx4,"SACAS", null);		
		Subgrupoitem subgrpprdxxitem6i = new Subgrupoitem (null,subgrpprdxx4,"NENHUM", null);		
		subgrpprdxx4.getSubgrupoitens().addAll(Arrays.asList(subgrpprdxxitem1i, subgrpprdxxitem2i,subgrpprdxxitem3i,subgrpprdxxitem4i,subgrpprdxxitem5i,subgrpprdxxitem6i));			

		PRDXX.getSubgrupos().addAll(Arrays.asList(subgrpprdxx1,subgrpprdxx2,subgrpprdxx4,subgrpcateXX1));	
		
		grupoRepository.save(PRDXX);
		

		Grupo PRDCOMP = new Grupo (null, 1 ,"COMPUTADOR");	
		 
		Subgrupo subgrpsubcate1 = new Subgrupo (null,"COMPUTADOR", PRDCOMP);	
		
		Subgrupoitem subgrpsubcateitem0 = new Subgrupoitem (null,subgrpsubcate1,"SELECIONAR", null);		
		Subgrupoitem subgrpsubcateitem1 = new Subgrupoitem (null,subgrpsubcate1,"LAP TOP", null);
		Subgrupoitem subgrpsubcateitem2 = new Subgrupoitem (null,subgrpsubcate1,"DESK TOP", null);	
		Subgrupoitem subgrpsubcateitem3 = new Subgrupoitem (null,subgrpsubcate1,"PLACA MAE", null);		
		subgrpsubcate1.getSubgrupoitens().addAll(Arrays.asList(subgrpsubcateitem0,subgrpsubcateitem1, subgrpsubcateitem2,subgrpsubcateitem3));
		
		PRDCOMP.getSubgrupos().addAll(Arrays.asList(subgrpsubcate1));	
		
        grupoRepository.save(PRDCOMP);
        
		Grupo PRDLAPTOP = new Grupo (null, 1 ,"LAP TOP");	
		 
		Subgrupo subgrpsubcatelaptop1 = new Subgrupo (null,"subcatelaptopLAPTOP", PRDLAPTOP);	
		
		Subgrupoitem subgrpsubcatelaptopitem1 = new Subgrupoitem (null,subgrpsubcatelaptop1,"SELECIONAR", null);
		Subgrupoitem subgrpsubcatelaptopitem2 = new Subgrupoitem (null,subgrpsubcatelaptop1,"MICROSOFT", null);	
		Subgrupoitem subgrpsubcatelaptopitem3 = new Subgrupoitem (null,subgrpsubcatelaptop1,"DELL", null);		
		subgrpsubcatelaptop1.getSubgrupoitens().addAll(Arrays.asList(subgrpsubcatelaptopitem1, subgrpsubcatelaptopitem2,subgrpsubcatelaptopitem3));
		PRDLAPTOP.getSubgrupos().addAll(Arrays.asList(subgrpsubcatelaptop1));	
        grupoRepository.save(PRDLAPTOP);

		Grupo PRDDESKTOP = new Grupo (null, 1 ,"DESK TOP");	
		 
		Subgrupo subgrpsubcateDESKTOP1 = new Subgrupo (null,"DESKTOP", PRDDESKTOP);	
		
		Subgrupoitem subgrpsubcateDESKTOPitem1 = new Subgrupoitem (null,subgrpsubcateDESKTOP1,"SELECIONAR", null);
		Subgrupoitem subgrpsubcateDESKTOPitem2 = new Subgrupoitem (null,subgrpsubcateDESKTOP1,"DELL", null);	
		Subgrupoitem subgrpsubcateDESKTOPitem3 = new Subgrupoitem (null,subgrpsubcateDESKTOP1,"APPLE", null);		
		subgrpsubcateDESKTOP1.getSubgrupoitens().addAll(Arrays.asList(subgrpsubcateDESKTOPitem1, subgrpsubcateDESKTOPitem2,subgrpsubcateDESKTOPitem3));
		PRDDESKTOP.getSubgrupos().addAll(Arrays.asList(subgrpsubcateDESKTOP1));
        grupoRepository.save(PRDDESKTOP);

		Grupo PRDDELL = new Grupo (null, 1 ,"DELL");	
		 
		Subgrupo subgrpsubcateDELL1 = new Subgrupo (null,"DELL", PRDDELL);	
		
		Subgrupoitem subgrpsubcateDELLitem1 = new Subgrupoitem (null,subgrpsubcateDELL1,"SELECIONAR", null);
		Subgrupoitem subgrpsubcateDELLitem2 = new Subgrupoitem (null,subgrpsubcateDELL1,"VERMELHO", null);	
		Subgrupoitem subgrpsubcateDELLitem3 = new Subgrupoitem (null,subgrpsubcateDELL1,"AMARELO", null);		
		subgrpsubcateDELL1.getSubgrupoitens().addAll(Arrays.asList(subgrpsubcateDELLitem1, subgrpsubcateDELLitem2,subgrpsubcateDELLitem3));
		PRDDELL.getSubgrupos().addAll(Arrays.asList(subgrpsubcateDELL1));
        grupoRepository.save(PRDDELL);        


		Grupo PRDVERMELHO = new Grupo (null, 1 ,"VERMELHO");	
		 
		Subgrupo subgrpsubcateVERMELHO1 = new Subgrupo (null,"VERMELHO", PRDVERMELHO);	
		
		Subgrupoitem subgrpsubcateVERMELHOitem1 = new Subgrupoitem (null,subgrpsubcateVERMELHO1,"SELECIONAR", null);
		Subgrupoitem subgrpsubcateVERMELHOitem2 = new Subgrupoitem (null,subgrpsubcateVERMELHO1,"ESCURO", null);	
		Subgrupoitem subgrpsubcateVERMELHOitem3 = new Subgrupoitem (null,subgrpsubcateVERMELHO1,"CLARO", null);		
		subgrpsubcateVERMELHO1.getSubgrupoitens().addAll(Arrays.asList(subgrpsubcateVERMELHOitem1, subgrpsubcateVERMELHOitem2,subgrpsubcateVERMELHOitem3));
		PRDVERMELHO.getSubgrupos().addAll(Arrays.asList(subgrpsubcateVERMELHO1));
        grupoRepository.save(PRDVERMELHO);
 
		Grupo PRDIMPRESSORA = new Grupo (null, 1 ,"IMPRESSORA");	
		 
		Subgrupo subgrpsubcateIMPRESSORA1 = new Subgrupo (null,"IMPRESSORA", PRDIMPRESSORA);	
		
		Subgrupoitem subgrpsubcateIMPRESSORAitem1 = new Subgrupoitem (null,subgrpsubcateIMPRESSORA1,"SELECIONAR", null);
		Subgrupoitem subgrpsubcateIMPRESSORAitem2 = new Subgrupoitem (null,subgrpsubcateIMPRESSORA1,"JATO TINTA", null);	
		Subgrupoitem subgrpsubcateIMPRESSORAitem3 = new Subgrupoitem (null,subgrpsubcateIMPRESSORA1,"LASER", null);		
		subgrpsubcateIMPRESSORA1.getSubgrupoitens().addAll(Arrays.asList(subgrpsubcateIMPRESSORAitem1, subgrpsubcateIMPRESSORAitem2,subgrpsubcateIMPRESSORAitem3));
		PRDIMPRESSORA.getSubgrupos().addAll(Arrays.asList(subgrpsubcateIMPRESSORA1));
        grupoRepository.save(PRDIMPRESSORA);        

		Grupo PRDCELULAR = new Grupo (null, 1 ,"CELULAR");	
		 
		Subgrupo subgrpsubcateCELULAR1 = new Subgrupo (null,"CELULAR", PRDCELULAR);	
		
		Subgrupoitem subgrpsubcateCELULARitem1 = new Subgrupoitem (null,subgrpsubcateCELULAR1,"SELECIONAR", null);
		Subgrupoitem subgrpsubcateCELULARitem2 = new Subgrupoitem (null,subgrpsubcateCELULAR1,"IOS", null);	
		Subgrupoitem subgrpsubcateCELULARitem3 = new Subgrupoitem (null,subgrpsubcateCELULAR1,"ANDROID", null);		
		subgrpsubcateCELULAR1.getSubgrupoitens().addAll(Arrays.asList(subgrpsubcateCELULARitem1, subgrpsubcateCELULARitem2,subgrpsubcateCELULARitem3));
		PRDCELULAR.getSubgrupos().addAll(Arrays.asList(subgrpsubcateCELULAR1));        
		grupoRepository.save(PRDCELULAR);


		Grupo PRDANDROID = new Grupo (null, 1 ,"ANDROID");	
		 
		Subgrupo subgrpsubcateANDROID1 = new Subgrupo (null,"ANDROID", PRDANDROID);	
		
		Subgrupoitem subgrpsubcateANDROIDitem1 = new Subgrupoitem (null,subgrpsubcateANDROID1,"SELECIONAR", null);
		Subgrupoitem subgrpsubcateANDROIDitem2 = new Subgrupoitem (null,subgrpsubcateANDROID1,"ALGODÃO DOCE", null);	
		Subgrupoitem subgrpsubcateANDROIDitem3 = new Subgrupoitem (null,subgrpsubcateANDROID1,"CAND", null);		
		subgrpsubcateANDROID1.getSubgrupoitens().addAll(Arrays.asList(subgrpsubcateANDROIDitem1, subgrpsubcateANDROIDitem2,subgrpsubcateANDROIDitem3));
		PRDANDROID.getSubgrupos().addAll(Arrays.asList(subgrpsubcateANDROID1));         
		grupoRepository.save(PRDANDROID);
                
		Grupo escolta3 = new Grupo (null, 1 ,"PRODUTO2");	
		 
		Subgrupo subgrpesco1 = new Subgrupo (null,"AET", escolta3);	
		
		Subgrupoitem subgrpescoitem1 = new Subgrupoitem (null,subgrpesco1,"DER", null);
		Subgrupoitem subgrpescoitem2 = new Subgrupoitem (null,subgrpesco1,"DSV", null);	
		Subgrupoitem subgrpescoitem3 = new Subgrupoitem (null,subgrpesco1,"DNIT", null);		
		subgrpesco1.getSubgrupoitens().addAll(Arrays.asList(subgrpescoitem1, subgrpescoitem2,subgrpescoitem3));
	
		Subgrupo subgrpesco2 = new Subgrupo (null,"ESCOLTA", escolta3);

		Subgrupoitem subgrpescoitem1e = new Subgrupoitem (null,subgrpesco2,"ANUAL", null);
		Subgrupoitem subgrpescoitem2e = new Subgrupoitem (null,subgrpesco2,"VIAGEM", null);	
		subgrpesco2.getSubgrupoitens().addAll(Arrays.asList(subgrpescoitem1e, subgrpescoitem2e));		

		escolta3.getSubgrupos().addAll(Arrays.asList(subgrpesco1,subgrpesco2));	
		
		grupoRepository.save(escolta3);
		
		Grupo der3 = new Grupo (null, 1 ,"DER");		 
		Subgrupo subgrpderanual = new Subgrupo (null,"ANUAL", der3);	
		Subgrupo subgrpderviagem = new Subgrupo (null,"VIAGEM", der3);	
		der3.getSubgrupos().addAll(Arrays.asList(subgrpderanual,subgrpderviagem));
		grupoRepository.save(der3);
		
		Grupo dsv3 = new Grupo (null, 1 ,"DSV");			 
		Subgrupo subgrpdsvanual = new Subgrupo (null,"ANUAL", dsv3);	
		Subgrupo subgrpdsvviagem = new Subgrupo (null,"VIAGEM", dsv3);
		dsv3.getSubgrupos().addAll(Arrays.asList(subgrpdsvanual,subgrpdsvviagem));
		grupoRepository.save(dsv3);		

		Grupo dnit3 = new Grupo (null, 1 ,"DNIT");	
		Subgrupo subgrpdnitanual = new Subgrupo (null,"ANUAL", dnit3);	
		Subgrupo subgrpdnitviagem = new Subgrupo (null,"VIAGEM", dnit3);
		dnit3.getSubgrupos().addAll(Arrays.asList(subgrpdnitanual,subgrpdnitviagem));
		grupoRepository.save(dnit3);		 
		

		gerarGruposPorEmpresa(1);
		gerarGruposPorEmpresa(2);

	}

	public void gerarGruposPorEmpresa(Integer empresaid) {

		
		Grupo grp1 = new Grupo (null, empresaid ,"CLIENTE");	

		
		Subgrupo subgrp1 = new Subgrupo (null,"PESSOA", grp1);	
		
		Subgrupoitem subgrpitem1 = new Subgrupoitem (null,subgrp1,"FISICA", null);
		Subgrupoitem subgrpitem2 = new Subgrupoitem (null,subgrp1,"JURIDICA", null);		
		Subgrupoitem subgrpitem3 = new Subgrupoitem (null,subgrp1,"OUTRO", null);
		subgrp1.getSubgrupoitens().addAll(Arrays.asList(subgrpitem1, subgrpitem2, subgrpitem3));
	
		Subgrupo subgrp2 = new Subgrupo (null,"ENDERECO", grp1);

		Subgrupoitem subgrpitem1e = new Subgrupoitem (null,subgrp2,"OPERACIONAL", null);
		Subgrupoitem subgrpitem2e = new Subgrupoitem (null,subgrp2,"COMERCIAL", null);			
		subgrp2.getSubgrupoitens().addAll(Arrays.asList(subgrpitem1e,subgrpitem2e));
		
		Subgrupo subgrp3 = new Subgrupo (null,"CONTATO", grp1);

		Subgrupoitem subgrpitem1c = new Subgrupoitem (null,subgrp3,"FINANCEIRO", null);
		Subgrupoitem subgrpitem2c = new Subgrupoitem (null,subgrp3,"NOTA FISCAL", null);		
		subgrp3.getSubgrupoitens().addAll(Arrays.asList(subgrpitem1c,subgrpitem2c));		

		Subgrupo subgrp4 = new Subgrupo (null,"CONTATOITEM", grp1);

		Subgrupoitem subgrpitem1i = new Subgrupoitem (null,subgrp4,"E-MAIL", null);
		Subgrupoitem subgrpitem2i = new Subgrupoitem (null,subgrp4,"TELEFONE", null);
		Subgrupoitem subgrpitem3i = new Subgrupoitem (null,subgrp4,"CELULAR", null);
		Subgrupoitem subgrpitem4i = new Subgrupoitem (null,subgrp4,"FAX", null);		
		Subgrupoitem subgrpitem5i = new Subgrupoitem (null,subgrp4,"NEXTEL", null);		
		Subgrupoitem subgrpitem6i = new Subgrupoitem (null,subgrp4,"SITE", null);		
		subgrp4.getSubgrupoitens().addAll(Arrays.asList(subgrpitem1i, subgrpitem2i,subgrpitem3i,subgrpitem4i,subgrpitem5i,subgrpitem6i));			

		grp1.getSubgrupos().addAll(Arrays.asList(subgrp1,subgrp2,subgrp3,subgrp4));	

		
		grupoRepository.save(grp1);	

	    Grupo grp4 = new Grupo (null, empresaid ,"EMPRESA");	

		
		Subgrupo subgrpempr1 = new Subgrupo (null,"PESSOA", grp4);	
		
		Subgrupoitem subgrpempritem1 = new Subgrupoitem (null,subgrpempr1,"FISICA", null);
		Subgrupoitem subgrpempritem2 = new Subgrupoitem (null,subgrpempr1,"JURIDICA", null);		
		subgrpempr1.getSubgrupoitens().addAll(Arrays.asList(subgrpempritem1, subgrpempritem2));			

		Subgrupo subgrpempr2 = new Subgrupo (null,"STATUS", grp4);	
		
		Subgrupoitem subgrpempritem1X = new Subgrupoitem (null,subgrpempr2,"ATIVA", null);
		Subgrupoitem subgrpempritem2X = new Subgrupoitem (null,subgrpempr2,"SUSPENSA", null);		
		subgrpempr2.getSubgrupoitens().addAll(Arrays.asList(subgrpempritem1X, subgrpempritem2X));	

		Subgrupo subgrpempr4 = new Subgrupo (null,"SEGMENTO", grp4);

		Subgrupoitem subgrpempritem1i = new Subgrupoitem (null,subgrpempr4,"COMERCIO", null);
		Subgrupoitem subgrpempritem2i = new Subgrupoitem (null,subgrpempr4,"INDUSTRIA", null);
		Subgrupoitem subgrpempritem3i = new Subgrupoitem (null,subgrpempr4,"INFORMATICA", null);
		Subgrupoitem subgrpempritem4i = new Subgrupoitem (null,subgrpempr4,"TRANSPORTE", null);		
		Subgrupoitem subgrpempritem5i = new Subgrupoitem (null,subgrpempr4,"LOCADORA", null);		
		Subgrupoitem subgrpempritem6i = new Subgrupoitem (null,subgrpempr4,"METALURGICA", null);		
		subgrpempr4.getSubgrupoitens().addAll(Arrays.asList(subgrpempritem1i, subgrpempritem2i,subgrpempritem3i,subgrpempritem4i,subgrpempritem5i,subgrpempritem6i));			

		grp4.getSubgrupos().addAll(Arrays.asList(subgrpempr1,subgrpempr2,subgrpempr4));	

		grupoRepository.save(grp4);

		Grupo grp2 = new Grupo (null, empresaid ,"FORNECEDOR");	
		
		Subgrupo subgrpforana1 = new Subgrupo (null,"PESSOA", grp2);	
		
		Subgrupoitem subgrpforitem1 = new Subgrupoitem (null,subgrpforana1,"FISICA", null);
		Subgrupoitem subgrpforitem2 = new Subgrupoitem (null,subgrpforana1,"JURIDICA", null);		
		subgrpforana1.getSubgrupoitens().addAll(Arrays.asList(subgrpforitem1, subgrpforitem2));
	
		Subgrupo subgrpfor2 = new Subgrupo (null,"ENDERECO-FOR", grp2);

		Subgrupoitem subgrpforitem1e = new Subgrupoitem (null,subgrpfor2,"COMERCIAL", null);
		Subgrupoitem subgrpforitem2e = new Subgrupoitem (null,subgrpfor2,"RESIDENCIAL", null);	
		subgrpfor2.getSubgrupoitens().addAll(Arrays.asList(subgrpforitem1e, subgrpforitem2e));

		
		Subgrupo subgrpfor3 = new Subgrupo (null,"CONTATO", grp2);

		Subgrupoitem subgrpforitem1c = new Subgrupoitem (null,subgrpfor3,"FINANCEIRO", null);
		Subgrupoitem subgrpforitem2c = new Subgrupoitem (null,subgrpfor3,"OPERACIONAL", null);
		subgrpfor3.getSubgrupoitens().addAll(Arrays.asList(subgrpforitem1c, subgrpforitem2c));		

		Subgrupo subgrpfor4 = new Subgrupo (null,"CONTATOITEM", grp2);

		Subgrupoitem subgrpforitem1i = new Subgrupoitem (null,subgrpfor4,"E-MAIL", null);
		Subgrupoitem subgrpforitem2i = new Subgrupoitem (null,subgrpfor4,"TELEFONE", null);
		Subgrupoitem subgrpforitem3i = new Subgrupoitem (null,subgrpfor4,"CELULAR", null);
		Subgrupoitem subgrpforitem4i = new Subgrupoitem (null,subgrpfor4,"FAX", null);		
		Subgrupoitem subgrpforitem5i = new Subgrupoitem (null,subgrpfor4,"NEXTEL", null);		
		Subgrupoitem subgrpforitem6i = new Subgrupoitem (null,subgrpfor4,"SITE", null);		
		subgrpfor4.getSubgrupoitens().addAll(Arrays.asList(subgrpforitem1i, subgrpforitem2i,subgrpforitem3i,subgrpforitem4i,subgrpforitem5i,subgrpforitem6i));			

		grp2.getSubgrupos().addAll(Arrays.asList(subgrpfor2,subgrpfor2,subgrpfor3,subgrpfor4));	

		
		grupoRepository.save(grp2);	
	    Grupo grpfuncionario = new Grupo (null, empresaid ,"FUNCIONARIO");	

		
		Subgrupo subgrpfuncfuncionario = new Subgrupo (null,"STATUS", grpfuncionario);	
		
		Subgrupoitem subgrpfuncitem1 = new Subgrupoitem (null,subgrpfuncfuncionario,"ATIVO", null);
		Subgrupoitem subgrpfuncitem2 = new Subgrupoitem (null,subgrpfuncfuncionario,"SUSPENSO", null);		
		subgrpfuncfuncionario.getSubgrupoitens().addAll(Arrays.asList(subgrpfuncitem1, subgrpfuncitem2));
		
		Subgrupo subgrpfunc2 = new Subgrupo (null,"ESTCIVIL", grpfuncionario);
		
		Subgrupoitem subgrpfuncitem1e = new Subgrupoitem (null,subgrpfunc2,"CASADO", null);
		Subgrupoitem subgrpfuncitem2e = new Subgrupoitem (null,subgrpfunc2,"SOLTEIRO", null);	
		subgrpfunc2.getSubgrupoitens().addAll(Arrays.asList(subgrpfuncitem1e, subgrpfuncitem2e));
		
		Subgrupo subgrpfunc3 = new Subgrupo (null,"CONTATO", grpfuncionario);
		
		Subgrupoitem subgrpfuncitem1c = new Subgrupoitem (null,subgrpfunc3,"MAE", null);
		Subgrupoitem subgrpfuncitem2c = new Subgrupoitem (null,subgrpfunc3,"PAI", null);
		Subgrupoitem subgrpfuncitem3c = new Subgrupoitem (null,subgrpfunc3,"PESSOAL", null);
		subgrpfunc3.getSubgrupoitens().addAll(Arrays.asList(subgrpfuncitem1c,subgrpfuncitem2c,subgrpfuncitem3c));		
		
		Subgrupo subgrpfunc4 = new Subgrupo (null,"CONTATOITEM", grpfuncionario);
		
		Subgrupoitem subgrpfuncitem1i = new Subgrupoitem (null,subgrpfunc4,"E-MAIL", null);
		Subgrupoitem subgrpfuncitem2i = new Subgrupoitem (null,subgrpfunc4,"TELEFONE", null);
		Subgrupoitem subgrpfuncitem3i = new Subgrupoitem (null,subgrpfunc4,"CELULAR", null);
		Subgrupoitem subgrpfuncitem4i = new Subgrupoitem (null,subgrpfunc4,"FAX", null);		
		Subgrupoitem subgrpfuncitem5i = new Subgrupoitem (null,subgrpfunc4,"NEXTEL", null);		
		Subgrupoitem subgrpfuncitem6i = new Subgrupoitem (null,subgrpfunc4,"SITE", null);		
		subgrpfunc4.getSubgrupoitens().addAll(Arrays.asList(subgrpfuncitem1i, subgrpfuncitem2i,subgrpfuncitem3i,subgrpfuncitem4i,subgrpfuncitem5i,subgrpfuncitem6i));			
		
		
		Subgrupo subgrpfunc5 = new Subgrupo (null,"TIPOENDER", grpfuncionario);

		Subgrupoitem subgrpfuncitem22e = new Subgrupoitem (null,subgrpfunc5,"RESIDENCIAL", null);	
		subgrpfunc5.getSubgrupoitens().addAll(Arrays.asList( subgrpfuncitem22e)); 
		
		
		grpfuncionario.getSubgrupos().addAll(Arrays.asList(subgrpfuncfuncionario,subgrpfunc2,subgrpfunc3,subgrpfunc4,subgrpfunc5));	
		
		
		grupoRepository.save(grpfuncionario);	
	    Grupo grpvendedor = new Grupo (null, empresaid ,"VENDEDOR");	

		
		Subgrupo subgrpvendvendedor = new Subgrupo (null,"STATUS", grpvendedor);	
		
		Subgrupoitem subgrpvenditem1 = new Subgrupoitem (null,subgrpvendvendedor,"ATIVO", null);
		Subgrupoitem subgrpvenditem2 = new Subgrupoitem (null,subgrpvendvendedor,"INATIVO", null);		
		subgrpvendvendedor.getSubgrupoitens().addAll(Arrays.asList(subgrpvenditem1, subgrpvenditem2));

		Subgrupo subgrpvend2 = new Subgrupo (null,"TIPOVEND", grpvendedor);

		Subgrupoitem subgrpvenditem1e = new Subgrupoitem (null,subgrpvend2,"INTERNO", null);
		Subgrupoitem subgrpvenditem2e = new Subgrupoitem (null,subgrpvend2,"EXTERNO", null);	
		subgrpvend2.getSubgrupoitens().addAll(Arrays.asList(subgrpvenditem1e, subgrpvenditem2e));
		
		Subgrupo subgrpvend3 = new Subgrupo (null,"CONTATO", grpvendedor);

		Subgrupoitem subgrpvenditem1c = new Subgrupoitem (null,subgrpvend3,"FINANCEIRO", null);
		Subgrupoitem subgrpvenditem2c = new Subgrupoitem (null,subgrpvend3,"OPERACIONAL", null);
		subgrpvend3.getSubgrupoitens().addAll(Arrays.asList(subgrpvenditem1c, subgrpvenditem2c));		

		Subgrupo subgrpvend4 = new Subgrupo (null,"CONTATOITEM", grpvendedor);

		Subgrupoitem subgrpvenditem1i = new Subgrupoitem (null,subgrpvend4,"E-MAIL", null);
		Subgrupoitem subgrpvenditem2i = new Subgrupoitem (null,subgrpvend4,"TELEFONE", null);
		Subgrupoitem subgrpvenditem3i = new Subgrupoitem (null,subgrpvend4,"CELULAR", null);
		Subgrupoitem subgrpvenditem4i = new Subgrupoitem (null,subgrpvend4,"FAX", null);		
		Subgrupoitem subgrpvenditem5i = new Subgrupoitem (null,subgrpvend4,"NEXTEL", null);		
		Subgrupoitem subgrpvenditem6i = new Subgrupoitem (null,subgrpvend4,"SITE", null);		
		subgrpvend4.getSubgrupoitens().addAll(Arrays.asList(subgrpvenditem1i, subgrpvenditem2i,subgrpvenditem3i,subgrpvenditem4i,subgrpvenditem5i,subgrpvenditem6i));			


		Subgrupo subgrpvend5 = new Subgrupo (null,"TIPOENDER", grpvendedor);

		Subgrupoitem subgrpvenditem11e = new Subgrupoitem (null,subgrpvend5,"COMERCIAL", null);
		Subgrupoitem subgrpvenditem22e = new Subgrupoitem (null,subgrpvend5,"RESIDENCIAL", null);	
		subgrpvend5.getSubgrupoitens().addAll(Arrays.asList(subgrpvenditem11e, subgrpvenditem22e)); 
		
		Subgrupo subgrpvend6 = new Subgrupo (null,"PESSOA", grpvendedor);	
		
		Subgrupoitem subgrpvendxitem1 = new Subgrupoitem (null,subgrpvend6,"FISICA", null);
		Subgrupoitem subgrpvendxitem2 = new Subgrupoitem (null,subgrpvend6,"JURIDICA", null);		
		subgrpvend6.getSubgrupoitens().addAll(Arrays.asList(subgrpvendxitem1, subgrpvendxitem2));
		
		grpvendedor.getSubgrupos().addAll(Arrays.asList(subgrpvendvendedor,subgrpvend2,subgrpvend3,subgrpvend4,subgrpvend5,subgrpvend6));	

		
		grupoRepository.save(grpvendedor);	
				
	}
	
	public void gerarProdutosEmpresa(Empresa emp, Fornecedor forana1, int qtde) throws ParseException {

		String [] unidades = {"unidade", "kilo","metro","m3","volume","fardo","duzia","mil","pacote"};
		
		for (int i = 0; i < qtde; i++) {

			Random random = new Random();
			
			String produtonome = getProdutoNome();
			
			StringBuilder marca = new StringBuilder();
			marca.append("marca ");
			marca.append(produtonome);

			StringBuilder obs = new StringBuilder();
			obs.append("observacao ");
			obs.append(produtonome);

			StringBuilder ncm = new StringBuilder();
			ncm.append("ncm ");
			ncm.append(produtonome);

			StringBuilder ean = new StringBuilder();
			ean.append("codigo ean ");
			ean.append(produtonome);

			StringBuilder origem = new StringBuilder();
			origem.append("origem ");
			origem.append(produtonome);


			StringBuilder localiza = new StringBuilder();
			localiza.append("localiza ");
			localiza.append(produtonome);
			
			double valorvend = random.nextInt(251) / 44.5;
			
			Produto p1 = new Produto (null,produtonome, marca.toString(),unidades[random.nextInt(unidades.length)],10.00,9.01, 12.50, ncm.toString(), localiza.toString()
	 				, 25, 45, ean.toString(),valorvend, 11.12,origem.toString(), "ATIVO","PRODUTO"
	 				,obs.toString(),"ELETRONICO",null,null,null,null
	 				,null, "","",null,micelaneas.dataDoDia(), null,emp.getId());		
	
			forana1.getProdutos().addAll(Arrays.asList(p1));
			p1.getFornecedores().addAll(Arrays.asList(forana1));
			
			fornecedorRepository.save(forana1);
	
			produtoRepository.save(Arrays.asList(p1));	
		}	
	}

	public String getProdutoNome() {
		
		String [] produtonome = { "Álcool etílico"
				,"Apliques capilares"
				,"Colheres"
				,"Cintas umbilicais"
				,"Barbante"
				,"Escovas de dentes"
				,"Dominós"
				,"Farinha de trigo"
				,"Livros razão"
				,"Máquinas rendeiras"
				,"Ovos"
				,"Paliteiros"
				,"Remos"
				,"Sabonetes"
				,"Sacos de dormir"
				,"Tesouras"
				,"Tortas"
				,"Uísque"
				,"Vasos"
				,"Vassouras"
				,"Edredons"};	

		String [] cores = {"azul", "verde","lilas","cinza","prata","marrom","laranja","rosa","bege"};
		
		String produto;
		Random random = new Random();
		int numero = random.nextInt(51);	
		
		produto = produtonome[random.nextInt(produtonome.length)] + " " + cores[random.nextInt(cores.length)] + " " + numero ;
		
	    return produto;	
		
	};


}