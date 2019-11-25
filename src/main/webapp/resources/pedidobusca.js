  		$(document).ready(function(){

			$('#frmProduto').bind('submit',function(e){
	  			e.preventDefault();
	  		});		            
  		});
 
  		//Chama modal pesquisa para Cliente
 		$("#btnClientePesq").click( function (e) {
  			e.preventDefault();
             $('#modalPesquisa').modal('toggle');
             $('#txtRelacionamento').val("CLIENTE");
             $("#txtRelacionamento").attr("origem", "ARPZPED-CLIENTE");
  		});  

  		//Chama modal pesquisa para Vendedor
 		$("#btnPesquisarVend").click( function (e) {
  			e.preventDefault();
             $('#modalPesquisa').modal('toggle');
             $('#txtRelacionamento').val("VENDEDOR");
             $("#txtRelacionamento").attr("origem", "ARPZPED-VENDEDOR");
  		});  
 		
  		// Incluir novos pedidos
 		$("#btnIncluirPedido").click( function (e) {
  			e.preventDefault();
 			var url = './pedidoinclui.html?param1=';
 	 		url += getUrlVars()["param1"];
 	        window.parent.location.href = url;  
  		});  

  		//Editar pedido para alteração
  		$(document).on("click", "#btnEditarPed", function(e){
  			e.preventDefault();
 			var url = './pedidoinclui.html?param1=';
 	 		url += getUrlVars()["param1"];
 	 		url += '&param99='
 	 		url +=  $(this).parent().parent().find(".col-xs-1").text();
 	        window.parent.location.href = url;  
  			
    	});  		
 		$("#btnPesquisar").click( function (e) {
  			e.preventDefault();
  			
   		  	var ambiente = getAmbiente();
   			var idEmpresa = getUrlVars()["param1"];
   	   		    idEmpresa = idEmpresa.replace('#', '');
   	   			
   	   		    arg = "";
   	   		    arg += ambiente;
   	   		    arg += '/pessoa/rest/pedido/filtro/';
   	   		    arg += idEmpresa;
   	   		    arg += '/';
   	   		    arg += "0";  // Cliente por enquanto 0
   	   		    arg += '/';   	   	   		    
   	   		    arg += "0" // Vendedor por enquanto 0
   	   		    
   	   		    getFiltro(arg);
  		}); 
 		
  		//Retorno modal pesquisa para Cliente 		
 		$(document).on("click", "#btnSelecionar", function(){ 			
  			
 			var sourceform = $("#txtRelacionamento").attr("origem");

 			switch(sourceform) {
 		    case "ARPZPED-CLIENTE":
		    	$('#txtIdCliente').val($(this).parent().parent().find(".col-xs-1").text());
 		    	$('#txtClientePesq').val($(this).parent().parent().find(".col-xs-6").text());
 		    	break;
 		    case "ARPZPED-VENDEDOR":
		    	$('#txtIdVendedor').val($(this).parent().parent().find(".col-xs-1").text());
 		    	$('#txtVendPesq').val($(this).parent().parent().find(".col-xs-6").text());
 		    	break; 		    	
 		    default:
 		        alert("Form de origem não previsto");
 			}
 			$('#btnPesqFechar').trigger('click');
 		});
 		 
  		//Grava dados Pessoa 
   		$("#btnVoltar").click( function () {
 			var url = "";
 			url += './pessoabusca.html?param1=';
 			url += $("#txtempresa").val();

 	        window.parent.location.href = url;   
 	        
  		});
 
   		$("#btnNovo").click( function (e) {
  			e.preventDefault();
   			//alert("Entrou clik botao novo");
 			var url = './pedidoinclui.html?param1=';
 	 		url += getUrlVars()["param1"];	
 	 		url += '&param99='
 	 	  	url +=  "Null"; 	 		
 	        window.parent.location.href = url;  
  		});
   		
  		//Grava dados Produto 
   		$("#bntGravar").click( function () {

   			$('#msg').html("");
   			
   			if ($("#txtId").val() != "") {  
   				$('#txtId').prop('disabled', false);
   				}

   	        var json = JSON.parse(JSON.stringify(jQuery('#frmProduto').serializeArray()));   	        
   	        var json2 = formataJsonForm(json);
   	        //alert("Json 2ffff" + json2)
   	     			
   			var dadosJ = JSON.stringify(json2);
            var obj1 = $.parseJSON(dadosJ); //convert string to obj

   			$('#txtId').prop('disabled', true);
   			
	   		var ambiente = getAmbiente();
	   	    arg = "";
	   		arg += ambiente;
	   	    arg += '/pessoa/rest/produto/';
	   	    	   	     
  		    $.ajax({
  		    	type: 'POST',
  		    	url: arg,
  		    	contentType: 'application/json;charset=utf-8',
  		    	dataType: 'json',
  		    	method: 'POST',
				cache: false,
  		        data: obj1, 		    	
  		        success:function(response){
  		           $('#txtId').val(apenasNumeros(response.msg));
  		           $('#msg').html(response.msg); 		           
  		        },
  		        error: function(e, msg) {
  		             $('#msg').html("***Erro - satus="  + e.status +  "---> " + e.statusText);
  		             $('#msg').css("color","##FF0000");

			    }
			    
			    
  		    }); 
  		      					  			
  		});


  		window.onload = function() {
			
			$("#txtidempresa").val(getUrlVars()["param2"]);
  			$("#txtDataInicio").mask("00/00/0000");
  			$("#txtDataFim").mask("00/00/0000");
  			
  			$("#txtDataFim").addClass("cantoreto");
  			
		   	$('#txtClientePesq').val('');
  			
            $('#cboSituacao').focus();
				
  	}  	//document ready close;	     
       
  
function getUrlVars(){
    var vars =[], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?')+1).split('&');
    for(var i =0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
	      vars.push(hash[0]);
	      vars[hash[0]]= hash[1];
	    }
	    return vars;
}


function ConvertFormToJSON(form){

    var array = $(form).serializeArray();
    var json = {};
    jQuery.each(array, function() {
        json[this.name] = this.value || '';
        });

         return json;
 }
function ConvertddmmaaaaToaaaammdd(data){

	var dataReturn = ""; 
	dataReturn += data.substring(6, 10);
	dataReturn += "-";
	dataReturn += data.substring(3, 5);
	dataReturn += "-";
	dataReturn += data.substring(0, 2);

    return dataReturn;
    
 }
function ConvertaaaammddToddmmaaaa(data){

	var dataReturn = ''; 
	dataReturn += data.substring(8, 10);
	dataReturn += '/';
	dataReturn += data.substring(5, 7);
	dataReturn += '/';
	dataReturn += data.substring(0, 4);
	
    return dataReturn;
    
 }
	function limparFormulario(){
			$('#frmProduto').each (function(){
	   			  this.reset();
	   			});
	            $('#txtNome').focus(); 
				$("#txtidempresa").val(getUrlVars()["param2"]);

    }

	function getFiltro(url){
	    $.ajax({
		    	type: 'GET',
		    	url: url,
		    	dataType:'json',
		        success:function(response){
		         	carregarPedido(response);
		        },
		        error: function(e, msg) {
		    console.log(e);
		    console.log(msg);				    }
		    }); 

}
	function carregarPedido(json){

	   	$("#tbodyPedido").empty();
		   	
	    if (json.length == 0 ){

	      var newRow = $('<tr class="row">');
		  var cols = "";
		
		  cols += '<td class="col-xs-1">';
		  cols += '***';
		  cols += '</td>';
		  cols += '<td class="col-xs-2">';
		  cols += 'Não foram encontrados pedidos cadastrados';
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
	    
	    cols += '<td class="col-xs-1">';
	    cols += json[i].id;
	    cols += '</td>';
	    cols += '<td class="col-xs-2">';
	    cols += json[i].datainclusao;
	    cols += '</td>';
	    cols += '<td class="col-xs-3">';
	    cols += json[i].nomecliente;
	    cols += '</td>';
	    cols += '<td class="col-xs-3">';
	    cols += json[i].nomevendedor;
	    cols += '</td>';
	    cols += '<td class="col-xs-2">';
	    cols += json[i].valor;
	    cols += '</td>';
	    cols += '<td class="col-xs-2">';
	    cols += json[i].situacao ;
	    cols += '</td>';
	    cols += '<td class="col-xs-2">';
	    cols += '<button class="btn btn-success btn-xs" id="btnEditarPed" type="submit" >Editar</button>';
	    cols += '</td>';
	   
	    newRow.append(cols);
	    $("#tablePedido").append(newRow);
	          }
	        }     
	 
	}
	  $(function(){
	   //   $("body").keypress(function(event)
  	      $("body").keydown(function(event)	    		  
	      {
  	    	 //Teclou insert  
  	    	 if (event.keyCode == 45){
  	    		 $('#bntNovo').trigger('click');} ;
  	    		 
  	  	   	 //Teclou F3 - Pesquisar 
  	    	 if (event.keyCode == 114){
  	    		 $('#btnPesquisar').trigger('click');} ;
  	    		  	    		 
    		 
	    	 //alert("Pressionou a tecla " + event.keyCode) 
	      });
	  });
