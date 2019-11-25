$('body').on('shown.bs.modal', '#modalconsultapedido', function (e) {
    e.preventDefault();
	$("#tbodyPedido tr").remove();
	$("#numeropesquisa").val("")
	$("#nomecliente").val("")
	$("#modalstatuspedido option:selected").text();
	$('input:visible:enabled:first', this).focus();
})
$(document).on("click", "#pesquisarpornumero", function(e){	
		e.preventDefault();	  
		if ($("#numeropesquisa").val() == "")
		   {alert("Preencha o campo número")
			$("#numeropesquisa").focus();
		     return;
		}
		
		$("#label1").html("Status");
		$("#label2").html("Data");	
		$("#label3").html("");		

		var url =  "/pedidos/" + $("#numeropesquisa").val()
		consultapedido(url, "consultarpedidonumero")	
}); 
$(document).on("click", "#pesquisarpornome", function(e){	
			e.preventDefault();	  

	if ($("#nomecliente").val() == "")
	   {alert("Preencha o campo nome")
		$("#nomecliente").focus();
	     return;
	} 

	$("#label1").html("Cliente");
	$("#label2").html("Status");	
	$("#label3").html("Data");	
	
	var url =  "/pedidos/" + sessionStorage.getItem("id") + "/" + $("#modalstatuspedido option:selected").text() + "/" + $("#nomecliente").val()
	consultapedido(url, "consultarpedidocliente")

}); 
  		
function consultapedido(url, operacao) {
	
	    $.ajax({
	    	type: 'GET',
	    	url: getAmbiente() + url ,
	    	dataType:'json',
	        async: false, 	    	
            beforeSend : function (xhr){
            	xhr.setRequestHeader('Authorization', sessionStorage.getItem("arpz"))
            },
	        success:function(response){ 
  		       	switch (operacao) { 
  		      	case "consultarpedidonumero":  
 		      		  carregartabelapedidonumero(response); 
		      		  break;	
  		      	case "consultarpedidocliente":  
  		      	      carregartabelapedido(response); 
		      		  break;		      		  
  		      	default:
  		        	  alert("Modal Consulta Pessoa Nome - funcionariocadastrocon - Metodo get no status success - operação não informada");	
  		      	      break;
  		        }	
	        },
		        error:	function(request, status, error, response) {	
	  		       	switch (request.status) { 
	  		      	case 403: 
	  		        	alert("Usuário não autorizado para esta operação");		  		      		
	  		      		break;
	  		      	case 404: 
	  		        	alert("Pedido não encontrado");		  		      		
	  		      		break;	  		      		
	  		      	default:	
	  	  		       	switch (operacao) { 
	  	 		      	case "consultarpedidonumero":  
	  	 		      	case "consultarpessoadoc":  
	  	 		      	case "consultarpedidocliente":  	  	 		      			  	 		      	
		  		        	 $('#msgmodalpessoa').html( "Erro *** " + JSON.stringify(request));  
	 		                 $('#msgmodalpessoa').css("color","red");
	  		  		         break;
	  	  		      	default:
	   		        	     alert("Metodo get no status error - operação não informada");		  	  		      		
	  	  		      	     break;
	  	  		        }
	                break;
	  		        }	
  		        }	  		        		  		      				            
	    });		
	}
	function carregartabelapedido(json) {

		    //Limpa tabela antes de carregar
	   	  	$("#tbodyPedido tr").remove();
	   	  	
	   	  	//alert("json " + JSON.stringify(json))
			if (json.length == 0 ){

		    var newRow = $('<tr class="row">');
		    var cols = "";

		    cols += '<td class="col-xs-1">';
		    cols += '***';
		    cols += '</td>';
		    cols += '<td class="col-xs-2">';
		    cols += 'Não foram encontrados itens para esta pesquisa';
		    cols += '</td>';
		    cols += '<td class="col-xs-4"></td>';
		    cols += '<td class="col-xs-3">;</td>';
		    cols += '<td class="col-xs-2">';
		    cols += '';
		    cols += '</td>';

		    newRow.append(cols);
		    $("#tablePedido").append(newRow);
			} else {

	     for (i=0; i < json.length ; i++) {

	        var newRow = $('<tr class="row" id="linhaTabela">');
	        var cols = "";
	  	    
	        cols += '<td class="col-xs-1" id="idmodal">';
	        cols += json[i][0];
	        cols += '</td>';            
	        cols += '<td class="col-xs-4" id="nomemodal">';
	        cols += json[i][1];
	        cols += '</td>';	            
	        cols += '<td class="col-xs-2" id="documentomodal">' 
	        cols += json[i][2];        	
	        cols +=	'</td>';
	        cols += '<td class="col-xs-2">' 
	        if (json[i][3] != null){
	        	cols += json[i][3] 
	        }		                	
	        cols +=	'</td>';        
	        cols += '<td class="col-xs-3">';
	        cols += '<button  class="btn btn-success btn-xs " id="selecionarpedidoitem"  type="submit" >Selecionar</button>';
	        cols += '</td>';

	        newRow.append(cols);
	        $("#tablePedido").append(newRow);
			    }
		    }
		} 
	function carregartabelapedidonumero(json) {

	        //Limpa tabela antes de carregar
   	  	    $("#tbodyPedido tr").remove();

   	        var newRow = $('<tr class="row" id="linhaTabela">');
   	        var cols = "";
   	  	    
   	        cols += '<td class="col-xs-1" id="idmodal">';
   	        cols += json.id
   	        cols += '</td>';            
   	        cols += '<td class="col-xs-2" id="statusmodal">';
   	        cols += json.status;
   	        cols += '</td>';	            
   	        cols += '<td class="col-xs-2" id="instantemodal">' 
   	        cols += json.instante;        	
   	        cols +=	'</td>';
   	        cols += '<td class="col-xs-2">' 	                	
   	        cols +=	'</td>';        
   	        cols += '<td class="col-xs-5">';  	        
   	        cols += '<button  class="btn btn-success btn-xs " id="selecionarpedidoitem"  type="submit" >Selecionar</button>';
   	        cols += '</td>';
   	        
   	        newRow.append(cols);
   	        $("#tablePedido").append(newRow);
   	        
	} 	