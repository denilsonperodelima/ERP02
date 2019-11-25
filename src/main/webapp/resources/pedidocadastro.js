$(document).ready(function(){
	$('#clientecadastro').bind('submit',function(e){
		e.preventDefault();
	});
});
   		
window.onload = function() {  

  	  sessionStorage.setItem("id","1");
  	  sessionStorage.setItem("nome","EMPRESA TESTE NO LOAD SA")
  	
  	  $('#emp').html(sessionStorage.getItem("nome"));
  	  
	  iniciarpagina();
	  
  	  $('#emp').html(sessionStorage.getItem("nome"));
	  //operacaoGET("/grupo/1/"  + "CLIENTE", "carregarcombos")
  	  
  	  $('#linhaitempedido #preco').mask("0000.00", {reverse: true});;	
      $("#linhaitempedido #quantidade").mask("0000.0", {reverse: true});
      
      operacaoGET(("/produto/empresa/" + sessionStorage.getItem("id")), "carregarprodutos"); 
      
      $("#id").val("1") 
 	  operacaoGET("/pedidos/" + $("#id").val() + "/", "carregarpedidoid") 
 	 
	  
}  	//document load close;	
$("#pesquisarpedido").click( function (e) {
	e.preventDefault();
    $('#modalconsultapedido').modal('toggle');
}); 

$("#pesquisarcliente").click( function (e) {
		e.preventDefault();
		$("#modalrelac").html("CLIENTE");
        $('#modalpessoaconsultanome').modal('toggle');
});  

$("#pesquisarvendedor").click( function (e) {
	e.preventDefault();
	$("#modalrelac").html("VENDEDOR");
    $('#modalpessoaconsultanome').modal('toggle');
}); 

$(document).on("click", "#selecionarpessoaitem", function(e){	
		e.preventDefault();
	       	switch ($("#modalrelac").html()) { 
		      	case "VENDEDOR":  
		    		  $("#vendedornome").val($(this).parent().parent().find("#nomemodal").text()); 
		    		  $('#vendedornome').attr("idvendedor", $(this).parent().parent().find("#idmodal").text()); 
				      break;
		      	case "CLIENTE":  
		    		$("#clientenome").val($(this).parent().parent().find("#nomemodal").text()); 
		    		$('#clientenome').attr("idcliente", $(this).parent().parent().find("#idmodal").text()); 

		    		$('#clientecidadeuf').html ('<strong>' + $(this).parent().parent().find("#documentomodal").text() + " - "+ $(this).parent().parent().find("#cidadeufmodal").text())
			      break; 				      			      
		      	default:	
		      	  break;
		       }	
	    $('#pessoaconsultanomefechar').trigger('click'); //fechou modal				
});

$(document).on("click", "#selecionarpedidoitem", function(e){	
	e.preventDefault();	
	 $('#id').val($(this).parent().parent().find("#idmodal").text());
	 operacaoGET("/pedidos/" + $("#id").val() + "/", "carregarpedidoid") 
     $('#pedidoconsultanomefechar').trigger('click'); //fechou modal				
});

$(document).on("keyup", function(e) { 
	e.preventDefault();
	//alert(e.which)
	if ( e.altKey && ( e.which == 78 ) ) { //ALT + N
	   $('#novo').trigger('click');
	}
	if ( e.altKey && ( e.which == 79 ) ) { //ALT + O
		   $('#novocontato').trigger('click');
		}	
	if ( e.altKey && ( e.which == 80 ) ) { // ALT + P
	   $('#pesquisarpedido').trigger('click');
	}   
	if ( e.altKey && ( e.which == 67 ) ) { // ALT + C
		   $('#pesquisarcliente').trigger('click');
		} 
	if ( e.altKey && ( e.which == 86 ) ) { // ALT + V
		   $('#pesquisarvendedor').trigger('click');
		}	
});

$("#gravarpedidocadastro").click( function (e) {
	e.preventDefault();

    if (consistirpagina() == false) {
	       return;	
	};    

    definirusuariostrilha(); //definir usuario de inclusao e.ou alteracao
	
    var json = formatarjsonpedidoitem();

	//alert("json " + json)
    //console.log(json);
	gravarpedido(json);
	
 }); 

$("#finalizarpedido").click( function (e) {
	e.preventDefault();

    definirusuariostrilha(); //definir usuario de inclusao e.ou alteracao
	
    var json = formatarjsonpedido();

	//alert("json " + json)
    //console.log(json);
	finalizarpedido(json);
	
 }); 

$("#novo").click( function (e) {
	e.preventDefault();
	iniciarpagina();
    $('#pesquisarcliente').focus();

 });
        
$("#tipopessoa").change( function () {		
	$("#tipopessoa option:selected").each(function() {
		configurarPessoa($("#tipopessoa option:selected").text());
	}); 
});


function iniciarpagina(){
   	   
	limparformulario($("#pedidocadastro"))
    
    $('#id').val("null");
	
	$('#msg').html("");	

    $('.luitempedido #liitempedidodinamico').each(function(index, element) {
 	   element.remove();
 	});
    			
	 $('#clientenome').attr("disabled", false);  	     
	 $('#vendedornome').attr("disabled", false);  
	 $('#pesquisarcliente').attr("disabled", false);  
	 $('#pesquisarvendedor').attr("disabled", false); 
	 $('#gravarpedidocadastro').attr("disabled", false);		
	 $('#adicionaritempedido').attr("disabled", false);	
	 $('#finalizarpedido').attr("disabled", false); 
	 $('#finalizarpedido').html("<u>F</u>inalizar Pedido");  
	 
	 $('#lidiv #adicionaritempedido').attr("disabled", false);	
	 $('#linhaitempedido #adicionaritempedido').attr("disabled", false);	
	
	 $("#clientecidadeuf").html(".");
	 $("#valortotalpedido").html(".");
} 

	function consistirpagina() {
   			
		if ($("#clientenome").val() == "") {
		    alert("Selecionar um cliente"); 	
	        $("#pesquisarcliente").focus();
			return false;
		}


		if ($("#vendedornome").val() == "") {
		    alert("Selecionar um vendedor"); 	
	        $("#pesquisarvendedor").focus();
			return false;
		}  
		
        if($('.luitempedido #liitempedidodinamico').length == 0){
		    alert("Incluir ao menos um item no pedido"); 	
	        $("#liitempedido #nomeproduto").focus();
			return false;      	
        }
      
        
        if($("#liitempedido #unidade").val() != ""){
		    alert("Incluir item na linha de edição, antes de salvar"); 	
	        $("#liitempedido #adicionaritempedido").focus();
			return false;      	
        }
        
	}
	
	function carregarpedidoitens(json){
			
		iniciarpagina();
		
		//alert("json " + JSON.stringify(json))
	    
		$('#id').val(json.id); 
		
		$('#clientenome').val(json.nomecliente);  
		$('#clientenome').attr("idcliente", json.idcliente); 
		$('#clientecidadeuf').html ('<strong>' + json.documento + " -  " + json.cidade + "/" + json.uf + '</strong>'); 
		
		$('#vendedornome').val(json.nomevendedor); 
		$('#vendedornome').attr("idvendedor", json.idvendedor); 

		carregartrilhaEmontarlinhatexto(json); // trilhaauditoriacontrole
		
	    $.each(json.itens, function(i, item) {
	    	
		  	  $('#linhaitempedido #idpedidoitem').val(item.id);  
		  	  $('#linhaitempedido #idproduto').val(item.idproduto);  
		  	  $('#linhaitempedido #nomeproduto').val(item.nomeproduto);  
		  	  $('#linhaitempedido #unidade').val(item.unidade);  
		  	  $('#linhaitempedido #quantidade').val(item.quantidade);  
		  	  $('#linhaitempedido #preco').val(item.preco.toFixed(2));			

		      calculartotallinhapedido(); //itempedido controle
		  	  adicionarlinhaitempedido();
		 }); 
	     calculartotaispedido();
		
		 $('#clientenome').attr("disabled", true);  	     
		 $('#vendedornome').attr("disabled", true);  
		 $('#pesquisarcliente').attr("disabled", true);  
		 $('#pesquisarvendedor').attr("disabled", true); 
		 
		 if(json.status == "FINALIZADO"){
			 setarpedidofinalizado(json.dtfinaliza)				 
		 }		 
	}		
	
	function setarpedidofinalizado(dtfinaliza){
		 $('#finalizarpedido').html("Pedido finalizado em " + dtfinaliza); 
		 $('#finalizarpedido').attr("disabled", true); 
		 $('#gravarpedidocadastro').attr("disabled", true);		
		 $('#lidiv #adicionaritempedido').attr("disabled", true);	
		 $('#linhaitempedido #adicionaritempedido').attr("disabled", true);	
	}