//Modal Pesquisa lançado 
$('#modalPesquisa').on('shown.bs.modal', function () {

  	$("#tbodyPesquisa").empty();
  	$("#txtPesqNome").val("");
  	$("#txtPesqNome").focus();
  	
})

   	    //Pesquisa por nome do modal
   		$(document).on('click', '#btnPesquisarNome', function(){
   			var ambiente = getAmbiente();
	   		var empresa = getUrlVars()["param1"];
		    var arg = "";
	   		    
 			switch($('#txtRelacionamento').val()) {
 		    case "PRODUTO":
	   		    arg += ambiente;
	   		    arg += '/pessoa/rest/produto/nome/';
	   		    arg += empresa;
	   		    arg += '/';
	   		    arg += $("#txtPesqNome").val();

		   		getProdutos(arg);
 		    	break;
 		    case "CLIENTE":		    	
   	   		    arg += ambiente;
   	   		    arg += '/pessoa/rest/relacionamento/nome/';
   	   		    arg += empresa;
   	   		    arg += '/';
   	   		    arg += $("#txtPesqNome").val();  
   	   		    arg += '/';
   	   		    arg += $("#txtRelacionamento").val();    	   		    
   	   		    
   	   		    getRelacionamento(arg);   
 		    	break;   
 		    case "VENDEDOR":		    	
   	   		    arg += ambiente;
   	   		    arg += '/pessoa/rest/relacionamento/nome/';
   	   		    arg += empresa;
   	   		    arg += '/';
   	   		    arg += $("#txtPesqNome").val();  
   	   		    arg += '/';
   	   		    arg += $("#txtRelacionamento").val();    	   		    
   	   		    
   	   		    getRelacionamento(arg);   
 		    	break;    		    	
 		    default:
 		        alert("Relacionamento não previsto - " + $('#txtRelacionamento').val());
 			}
 			
   		});
function getRelacionamento(url){
    $.ajax({
	    	type: 'GET',
	    	url: url,
	    	dataType:'json',
	        success:function(response){
	         	carregarRelacionamento(response);
	        },
	        error: function(e, msg) {
	    console.log(e);
	    console.log(msg);				    }
	    }); 

}
function carregarRelacionamento(json) {

  	$("#tbodyPesquisa").empty();		
  	
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

    cols += '<td class="col-xs-1" id="idpesquisado">';
    cols += json[i].id;
    cols += '</td>';
    cols += '<td class="col-xs-2">';
    cols += json[i].lpessoa;
    cols += '</td>';            
    cols += '<td class="col-xs-6" id="nomepesquisado">';
    cols += json[i].nomebusca;
    cols += '</td>';	            
    cols += '<td class="col-xs-3"></td>';
    
    cols += '<td class="col-xs-3">';
    cols += '<button  class="btn btn-success btn-xs" type="submit" id="btnSelecionar" >Selecionar</button>';
    cols += '</td>';

    newRow.append(cols);
    $("#tablePesquisa").append(newRow);
	    }
    }
}
function getProdutos(url){

	    $.ajax({
		    	type: 'GET',
		    	url: url,
		    	dataType:'json',
		        success:function(response){
		         	carregarProdutos(response);
		        },
		        error: function(e, msg) {
		    console.log(e);
		    console.log(msg);				    }
		    }); 

}
	function carregarProdutos(json) {

	   	  	$("#tablePesquisa tr").remove();	
	   	  	
			if (json.length == 0 ){

		    var newRow = $('<tr class="row">');
		    var cols = "";

		    cols += '<td class="col-xs-1">';
		    cols += '***';
		    cols += '</td>';
		    cols += '<td class="col-xs-2">';
		    cols += 'Não foram encontrados itens para esta pesquisa';
		    cols += '</td>';
		    cols += '';
		    cols += '</td>';

		    newRow.append(cols);
		    $("#tablePesquisa").append(newRow);
			} else {

         for (i=0; i < json.length ; i++) {

            var newRow = $('<tr class="row" id="linhaTabela">');
            var cols = "";

            cols += '<td class="col-xs-1">';
            cols += json[i].id;
            cols += '</td>';           
            cols += '<td class="col-xs-6">';
            cols += json[i].nome;
            cols += '</td>';	            
            cols += '<td class="col-xs-3"></td>';
            
            cols += '<td class="col-xs-3">';
            cols += '<button  class="btn btn-success btn-xs" type="submit" id="btnSelecionar">Selecionar</button>';
            cols += '</td>';

            newRow.append(cols);
            $("#tablePesquisa").append(newRow);
			    }
		    }
		}
