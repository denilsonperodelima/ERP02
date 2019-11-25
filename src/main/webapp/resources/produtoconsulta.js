
$(document.body).on('change',"#modaltipopessoa",function (e) {
	    $('#docpesquisa').val("");
	    mascarapessoa();
	});
$('body').on('shown.bs.modal', '#modalpessoaconsultanome', function (e) {
    e.preventDefault();
	//$('input:visible:enabled:first', this).focus();
	$("#tbodyPesquisa tr").remove();
	$("#nomepesquisa").val("")
	$("#docpesquisa").val("")
	$("#modaltipopessoa option:selected").text();
	$('select:visible:enabled:first', this).focus();
    mascarapessoa();	
})
$(document).on("click", "#botaopesquisarnome", function(e){	
			e.preventDefault();	  

	if ($("#nomepesquisa").val() == "")
	   {alert("Preencha o campo nome")
		$("#nomepesquisa").focus();
	     return;
	} 

	var url =  "/pessoa/nome/" + sessionStorage.getItem("id") + "/"  + $("#modalrelac").html() + "/" + $("#nomepesquisa").val()
	consultapessoa(url, "consultarpessoanome")

}); 
$(document).on("click", "#botaopesquisardoc", function(e){	
		e.preventDefault();	  

if ($("#modaltipopessoa option:selected").text() == "OUTRO")	{	
		if ($("#docpesquisa").val() == "")
	   {alert("Preencha o campo documento")
		$("#docpesquisa").focus();
	     return;
	   }        	   
}

if ($("#modaltipopessoa option:selected").text() != "OUTRO")	{	 
   if (consisteCNPJ_CPF($("#modaltipopessoa option:selected").text(),$("#docpesquisa").val())){ 
		} else {
	        $("#docpesquisa").focus();
			return false;
			}
}
	   
var url =  "/pessoa/documento/" + sessionStorage.getItem("id") + "/"  + $("#tiporelacionamento").val() + "/" +  $("#docpesquisa").val().replace("/","+").replace(".","x").replace(".","x");
consultapessoa(url, "consultarpessoadoc")

});

  		
function consultapessoa(url, operacao) {
	
	    $.ajax({
	    	type: 'GET',
	    	url: getAmbiente() + url ,
	    	dataType:'json',
            beforeSend : function (xhr){
            	xhr.setRequestHeader('Authorization', sessionStorage.getItem("arpz"))
            },
	        success:function(response){ 
  		       	switch (operacao) { 
  		      	case "consultarpessoanome":  
 		      	case "consultarpessoadoc":    		      		
  		              carregartabelapessoa(response); 
  				      break;
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
	  		      	default:	
	  	  		       	switch (operacao) { 
	  	 		      	case "consultarpessoanome":  
	  	 		      	case "consultarpessoadoc":  	  	 		      			  	 		      	
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
	function carregartabelapessoa(json) {

		    //Limpa tabela antes de carregar
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
	        cols += '<td class="col-xs-2" id="documentomodal">' 
	        cols += json[i][2];        	
	        cols +=	'</td>';
	        cols += '<td class="col-xs-2">' 
	        if (json[i][3] != null){
	        	cols += json[i][3] + "/" + json[i][4];	
	        }		                	
	        cols +=	'</td>';        
	        cols += '<td class="col-xs-3">';
	        cols += '<button  class="btn btn-success btn-xs " id="selecionarpessoaitem"  type="submit" >Selecionar</button>';
	        cols += '</td>';

	        newRow.append(cols);
	        $("#tablePesquisa").append(newRow);
			    }
		    }
		} 
function mascarapessoa() {
	switch($("#modaltipopessoa option:selected").text()) {
    case "FISICA":  
    	$('#docpesquisa').mask("000.000.000-00"); 		    	
    	break;	
    case "JURIDICA":  
    	$('#docpesquisa').mask("00.000.000/0000-00"); 		    	
    	break;	  		    	
    default:
    	$('#docpesquisa').unmask();	 
    	break;	   		    	
	}	
}