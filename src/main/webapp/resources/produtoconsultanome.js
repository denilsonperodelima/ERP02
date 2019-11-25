
$(document.body).on('change',"#modalprodutoconsultanome",function (e) {
	    $('#docpesquisa').val("");
	});
$('body').on('shown.bs.modal', '#modalprodutoconsultanome', function (e) {
    e.preventDefault();
	$("#tbodyPesquisa tr").remove();
	$("#nomepesquisa").val("")
	$("#docpesquisa").val("")
	$("#modaltipoproduto option:selected").text();
	$('input:visible:enabled:first', this).focus();
})
$(document).on("click", "#botaopesquisarnome", function(e){	
			e.preventDefault();	  

	if ($("#nomepesquisa").val() == "")
	   {alert("Preencha o campo nome")
		$("#nomepesquisa").focus();
	     return;
	} 

	var url =  "/produto/nome/" + sessionStorage.getItem("id") + "/"  + $("#nomepesquisa").val()
	consultaproduto(url, "consultarprodutonome")

}); 
$(document).on("click", "#botaopesquisardoc", function(e){	
		e.preventDefault();	  

if ($("#modaltipoproduto option:selected").text() == "OUTRO")	{	
		if ($("#docpesquisa").val() == "")
	   {alert("Preencha o campo documento")
		$("#docpesquisa").focus();
	     return;
	   }        	   
}

if ($("#modaltipoproduto option:selected").text() != "OUTRO")	{	 
   if (consisteCNPJ_CPF($("#modaltipoproduto option:selected").text(),$("#docpesquisa").val())){ 
		} else {
	        $("#docpesquisa").focus();
			return false;
			}
}
	   
var url =  "/produto/documento/" + sessionStorage.getItem("id") + "/"  + $("#tiporelacionamento").val() + "/" +  $("#docpesquisa").val().replace("/","+").replace(".","x").replace(".","x");
consultaproduto(url, "consultarprodutodoc")

});

  		
function consultaproduto(url, operacao) {
	
	    $.ajax({
	    	type: 'GET',
	    	url: getAmbiente() + url ,
	    	dataType:'json',
            beforeSend : function (xhr){
            	xhr.setRequestHeader('Authorization', sessionStorage.getItem("arpz"))
            },
	        success:function(response){ 
  		       	switch (operacao) { 
  		      	case "consultarprodutonome":     		      		
  		              carregartabelaproduto(response); 
  				      break;
		      		   break;				      
  		      	default:
  		        	  alert("Modal Consulta produto Nome - funcionariocadastrocon - Metodo get no status success - operação não informada");	
  		      	      break;
  		        }	
	        },
		        error:	function(request, status, error, response) {	
	  		       	switch (request.status) { 
	  		      	case 403: 
	  		        	alert("Usuário não autorizado para esta operação");		  		      		
	  		      		break;
	  		      	default:	
	  	  		       	switch (operacao) { 
	  	 		      	case "consultarprodutonome":  
	  	 		      	case "consultarprodutodoc":  	  	 		      			  	 		      	
		  		        	 $('#msgmodalproduto').html( "Erro *** " + JSON.stringify(request));  
	 		                 $('#msgmodalproduto').css("color","red");
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
	function carregartabelaproduto(json) {

	   	  	$("#tbodyPesquisa tr").remove();
	   	  	
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
		    $("#tablePesquisa").append(newRow);
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
	        cols += '<td class="col-xs-2" id="categoriamodalx">' 
	        cols += json[i][2];        	
	        cols +=	'</td>';
	        cols += '<td class="col-xs-2">' 
	        if (json[i][3] != null){ //marca
	        	cols += json[i][3] 	
	        }		                	
	        cols +=	'</td>';        
	        cols += '<td class="col-xs-3">';
	        cols += '<button  class="btn btn-success btn-xs " id="selecionarprodutoitem"  type="submit" >Selecionar</button>';
	        cols += '</td>';

	        newRow.append(cols);
	        $("#tablePesquisa").append(newRow);
			    }
		    }
		} 