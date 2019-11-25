//var argglobal = "";  		
$(document).ready(function(){

			$('#frmProduto').bind('submit',function(e){
	  			e.preventDefault();
	  		});	
			
			addRowTable(false);
			
            $("#txtnome").focus();
			
            $("#txtquantidade").mask("0000.0");
  			$("#txtvalorunitario").mask("###.###.##0,00", {reverse: true});
  			$("#txtVltotal").mask("###.###.##0.00", {reverse: true});
  			
	        $(function() {
	        	
	        	var empresa = getUrlVars()["param1"];
	        	var ambiente = getAmbiente();
	        	var dados;
	        	
	   		    arg = "";
	   		    arg += ambiente;
	   		    arg += '/pessoa/rest/produto/nometotal/';
	   		    arg += empresa;
	   		    arg += '/';
	   		    arg += "xx";
	   		    
	   		    getProdutoTotal(arg); //autocomplete

		   		     
            });   
	          	        
  		});

  		//
 		$("#bntGravar").click( function (e) {
  			e.preventDefault();
	
  			if (!consistirGravar()){
  				return false;
  			};
  	
  			$('#msg').html("");
   			
            var link = "";
            
            if ($('#txtLink').val() == "Null" || $('#txtLink').val() == "") {
                link = geraLink();
                idPedido = "";
			} else {
                link = $('#txtLink').val();	
                idPedido = $("#txtIdPedido").val();
			}  			
  			
  			var pedidoitem = "[" + tabelaJson(link) + "]";
  		       
			dadosJson = "{ ";
			if (idPedido != "Null" && idPedido != "" ) {  
				dadosJson += '"id": ' + '"'  + idPedido + '",';
			}
			
   			dadosJson += '"id_empresa": ' + getUrlVars()["param1"];
  			dadosJson += ',"link": ' + '"' + link + '"';   			

   			dadosJson += ',"situacao": ' + '"' + 'ANDAMENTO' + '"';
   			dadosJson += ',"id_cliente": ' + $('#txtIdCliente').val();
   			dadosJson += ',"id_vendedor": ' + $('#txtIdVendedor').val();   	
   			dadosJson += ',"nomevendedor": ' + '"' + $('#txtVendPesq').val() + '"'; 
   			dadosJson += ',"nomecliente": ' + '"' + $('#txtClientePesq').val() + '"';      			
   			dadosJson += ',"qtitens": ' + $("#spanItens").html();
   			dadosJson += ',"valor": ' + $("#spanValor").html();   			
   			
   			dadosJson += ',"usrinclusao": ' + '"' + "" + '"';  
   			dadosJson += ',"usralteracao": ' + '"' + "" + '"';  
   			
   			dadosJson += ',"dataalteracao": ' + '"' + ConvertddmmaaaaToaaaammdd("01-01-1900")  + '"';  
   			dadosJson += ',"datainclusao": ' + '"' + ConvertddmmaaaaToaaaammdd("01-01-1900")  + '"';  
   			
   			dadosJson += ',"pedidoitem": ' + pedidoitem;	
   			
			dadosJson += " }";	
			
		     alert ("Json total ok  " +  dadosJson); 

	   			var dadosJ = JSON.stringify(dadosJson);
	            var obj1 = $.parseJSON(dadosJ); //convert string to obj

		   		var ambiente = getAmbiente();
		   	    arg = "";
		   		arg += ambiente;
		   	    arg += '/pessoa/rest/pedido/';
		   	    
	  		    $.ajax({
	  		    	type: 'POST',
	  		    	url: arg,
	  		    	contentType: 'application/json;charset=utf-8',
	  		    	dataType: 'json',
	  		    	method: 'POST',
					cache: false,
	  		        data: obj1, 		    	
	  		        success:function(response){
	  		               $('#txtLink').val(link);
	  		               $('#txtIdPedido').val(apenasNumeros(response.msg));	  		               
	  		             
	 	   		  			//getPessoaLink(link);
		   		  			//getEnderecoLink(link);
		   		  			//getContatoLink(link);
		   		  		    //getRelacionamentoLink(link);
		   		  			
	  		        	 $('#msg').html(response.msg);
	  		        },
	  		        error: function(e, msg) {
	  		             $('#msg').html("***Erro - satus="  + e.status +  "---> " + e.statusText);
	  		             $('#msg').css("color","##FF0000");

				    }			    
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
 			$('#btnNovoItem').trigger('click');
 		});
 
 
  		//lostfocus quantidade 		
 		$(document).on("blur", "#txtquantidade", function(e){
  			e.preventDefault();

  			var valor = 0;
  			
  			if($("#txtquantidade").val() != ""){;
  				valor = $("#txtquantidade").val() * $("#txtvalorunitario").val();
  				$("#txtVltotal").val(valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
  	  			valor = $("#txtvalorunitario").val();
  	  			$("#txtvalorunitario").val(valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })); 				
  			}
 
 		}); 		
 		
  		//Nova linha de digitação de item do pedido 		
 		$(document).on("click", "#btnNovoItem", function(e){
  			e.preventDefault();
  			
  			if ($(this).closest("tr").index() == 0) {
  				
  	  			
  	  			if ($("#txtnome").val() == "" || $("#txtCodigo").val() == "" ) {
  	 			   alert("Selecione nome do produto !!!")
  	 			   $("#txtnome").focus();
  	 			   return false;
  	 		    }

  	  			if ($("#txtquantidade").val() == "") {
  	  			   alert("Informe quantidade do produto !!!")
  	  			   $("#txtquantidade").focus();
  	  			   return false;
  	  		    }
  				
				addRowTable(true);
				
				calculaTotais();
				
  			} else {
  				$(this).closest("tr").remove();
  				calculaTotais();
  			} 			
            $("#txtnome").focus();
 		});
 		 
  		//Grava dados Pessoa 
   		$("#btnVoltar").click( function () {
 			var url = "";
 			url += './pessoabusca.html?param1=';
 			url += $("#txtempresa").val();

 	        window.parent.location.href = url;   
 	        
  		});
 
  		//Limpar o formulário 
   		$("#bntNovo").click( function () {
   			limparFormulario();
	        $('#msg').html("Digite os dados para inclusão"); 
  		});
   		


 	window.onload = function() {
			
			$("#txtidempresa").val(getUrlVars()["param2"]);
  			$("#txtDataInicio").mask("00/00/0000");
  			$("#txtDataFim").mask("00/00/0000");
  			
  			$("#txtDataFim").addClass("cantoreto");
  			
		   	$('#txtClientePesq').val('');
  			
            $('#cboSituacao').focus();
            
        	var id = getUrlVars()["param99"];
        	
        	if(id != "Null") {
	        	var empresa = getUrlVars()["param1"];
	        	var ambiente = getAmbiente();
	        	var dados;
	        	
	   		    arg = "";
	   		    arg += ambiente;
	   		    arg += '/pessoa/rest/pedido/';
	   		    arg += id;
	   		    
	 		   	$("#btnClientePesq").prop( "disabled", true );
	 		   	$("#btnPesquisarVend").prop( "disabled", true );	   		 
	   		    
        		getPedido(arg);	
     		
        		
        	};
	   		     
  	}  	//window onload  close;	     
       
  
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

function addRowTable(clone){
	
	if (clone) {
		 
		var Row = $('#tbodyPedidoIncluir tr:first');
	    
		var clonedRow = $('#tbodyPedidoIncluir tr:first').clone();

		clonedRow.find('input:text').prop('disabled', true);
	    $("#tablePedidoIncluir").append(clonedRow);
	    $('#tablePedidoIncluir span:last').addClass("glyphicon glyphicon-trash");
	    $('#tablePedidoIncluir tr:first').val("")
	    
	    $(Row).find("input").val("");
	    
		return true;
	}
	
    var newRow = $('<tr class="row" id="linhaTabela">');
    var cols = "";

    cols += '<td class="col-xs-1" style="width: 4%">';
    cols += '<input type="text" name="id" id="txtId" name="id" style="width: 80%" disabled />';
    cols += '</td>';  
    
    cols += '<td  class="col-xs-1">';
    cols += '<input type="text" id="txtCodigo" name="id_produto" style="width: 90%" disabled />';
    cols += '</td>';
    
    cols += '<td  class="col-xs-2">';
    cols += '<input type="text" id="txtnome" name="nome" style="width: 100%"  />';
    cols += '</td>';
                
    cols += '<td class="col-xs-1">';
    cols += '<input type="text" id="txtquantidade" name="quantidade" style="width: 50%"  />';
    cols += '</td>';	
    
    cols += '<td class="col-xs-1">';
    cols += '<input type="text" id="txtUnidade" name="unidade" style="width: 70%" disabled />';
    cols += '</td>';   
    cols += '<td class="col-xs-2">';
    cols += '<input type="text" id="txtvalorunitario" name="valorunitario" align="right" style="width: 50%" disabled />';
    cols += '</td>'; 
    cols += '<td class="col-xs-2">';
    cols += '<input type="text" id="txtVltotal" name="vltotal" align="right" style="width: 50%" disabled />';
    
    cols += '</td>';               
    cols += '<td class="col-xs-3" >';
    cols += '<button  class="btn btn-success btn-xs" id="btnNovoItem" type="submit" >'
    cols += '<span class="glyphicon glyphicon-plus" id="tbPedidoIncluirButton"></span>'
    cols +=	'</button>';
    cols += '</td>';

    newRow.append(cols);
    $("#tablePedidoIncluir").append(newRow);

}

function getProdutoTotal(arg) {

	    $.ajax({
	    	type: 'GET',
	    	url: arg,
	    	dataType:'json',
	        success:function(response){	        	
	        carregarDados(response);	            
	        },
	        error: function(e, msg) {
			    console.log(e);
			    console.log(msg);				    }
	    }); 	  
}
function carregarDados(json) {

	 var dados = {};
	 var array = [];
	 var obj = {};
	   
	 for (i=0; i < json.length ; i++) {		 
		 array.push({'label' : json[i].nome,   'value': json[i].id, 'unidade': json[i].unidade, 'valorunitario': json[i].valorvenda  });			 
    }
 
	 //alert("Lista +arraynnn=  " + array + " Dadosyyy " + dadosyyy);
   		     
     $("#txtnome").autocomplete({
     	
     	source: array,
      	autoFocus: false,
        minLength:0,
         
         select: function(event, ui) {  
             $( "#txtnome" ).val(ui.item.label);  
             $( "#txtCodigo" ).val(ui.item.value);
             $( "#txtUnidade" ).val(ui.item.unidade);
             $( "#txtvalorunitario" ).val(ui.item.valorunitario);
             return false;  
         }
     
     });
}
function getPedido(arg) {

    $.ajax({
    	type: 'GET',
    	url: arg,
    	dataType:'json',
        success:function(response){	        	
       	carregarPedido(response);	            
        },
        error: function(e, msg) {
		    console.log(e);
		    console.log(msg);				    }
    }); 	  
}
function carregarPedido(json) {

	
	 $('#txtClientePesq').val(json.nomecliente );
	 $('#txtVendPesq').val(json.nomevendedor );


	 $('#txtIdPedido').val(json.id );
	 
	 $('#txtLink').val(json.link  );
	 
	 $('#txtIdCliente').val(json.id_cliente  );
	 $('#txtIdVendedor').val(json.id_vendedor  );
	 
 	var empresa = getUrlVars()["param1"];
	var ambiente = getAmbiente();	 
	    
    arg = "";
    arg += ambiente;
    arg += '/pessoa/rest/pedidoitem/link/';
    arg +=  $("#txtLink").val();	   		    
    getPedidoItem(arg); 
	 
}

function getPedidoItem(arg) {

    $.ajax({
    	type: 'GET',
    	url: arg,
    	dataType:'json',
        success:function(response){	        	
       	carregarPedidoItem(response);	            
        },
        error: function(e, msg) {
		    console.log(e);
		    console.log(msg);				    }
    }); 	  
}

function carregarPedidoItem(json) {

			  for (i=0; i < json.length ; i++) {
				
		        $('#tbodyPedidoIncluir tr:first').each(function() {    		
			        $(this).find("input").each(function(){		        	
	  		            if($(this).attr("name") == "id") {
	  		            	 $(this).val(json[i].id);	
	  		            };

	  		            if($(this).attr("name") == "nome") {
	 		            	 $(this).val(json[i].nome);	
	 		            };
	  		            if($(this).attr("name") == "id_produto") {
	 		            	 $(this).val(json[i].id_produto);	
	 		            };

	  		            if($(this).attr("name") == "valorunitario") {
	 		            	 $(this).val(json[i].valorunitario);	
	 		            };

	  		            if($(this).attr("name") == "quantidade") {
	 		            	 $(this).val(json[i].quantidade);	
	 		            };
	 		            
                        const valortotal = (json[i].quantidade) * (json[i].valorunitario);
	  		            if($(this).attr("name") == "vltotal") {
	 		            	 $(this).val(valortotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));	
	 		            };	 		            
			        })
 	 				addRowTable(true);			        
			    });
			  }  //for json.lenght - end 
			  calculaTotais();
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
    		 $('#bntConsultar').trigger('click');} ;
    		  	    		 
		 
    	 //alert("Pressionou a tecla " + event.keyCode) 
      });
  });
function calculaTotais(){

      var totalItens = 0;
      var totalValor = 0;
      var valor = 0;
    
      $('#tablePedidoIncluir tr').each(function() {
    		
	        $(this).find("input").each(function(){
	        	if($(this).attr("name") == "vltotal" &&  $(this).val() != ""){
	        		
	        		valor = apenasNumeros($(this).val());

	        		totalValor += parseFloat(valor/100);	
	        		//totalValor += parseFloat($(this).val());
	        		totalItens +=  1
	        	}	        			        		
	        })
	   }); 
      
       $("#spanItens").html(totalItens);
       $("#spanValor").html(totalValor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
}
function consistirGravar(){

    if($("#txtClientePesq").val() == "" ){
		alert("Selecione o nome do Cliente");
		$("#btnClientePesq").focus();
		return false;
	}	
    
    if($("#txtVendPesq").val() == "" ){
		alert("Selecione o nome do Vendedor");
		$("#btnPesquisarVend").focus();
		return false;
	}	

    //alert( " tamanho tabelayyyyyy " + $('#tablePedidoIncluir').find('tr').length);
    
    if((parseInt($('#tablePedidoIncluir').find('tr').length) -1 ) == 1 ){
		alert("Informe os itens do pedido");
		$("#txtnome").focus();
		return false;
	}	
    
	return true;     
}
function tabelaJson(link){
	   var array = [];
	   var pushlinha = false;

	    $('#tablePedidoIncluir tr').each(function() {

	        var values = [];
        
	        values.push( "lkpedido:" +   link ); 
	        
	        $(this).find("input").each(function(){

	        	if(($(this).attr("name") == "nome" && $(this).val() == "" )){
	     		   pushlinha = false;
	     		   return false;
	        	}
	        	
	            pushlinha = true; 
	          
	            //não envia vltotal
	            if(!($(this).attr("name") == "vltotal")){
	            //não envia o id se for inclusão
	            if(!($(this).attr("name") == "id" && $(this).val() == "" )){

  		            if(($(this).attr("name") != "id"
  		            	&& $(this).attr("name") != "id_produto"
	  		           	&& $(this).attr("name") != "quantidade"
		  		       	&& $(this).attr("name") != "valorunitario"  	)){            	  		            	
  		            		values.push( '"' + $(this).attr("name") + '"' + ":" + '"' +  $(this).val() + '"');
  		            }   else {
  		            		values.push( '"' + $(this).attr("name") + '"' + ":" +   $(this).val() ); 
  		            }
	            };   
	            };  		        	
	        })

	        if (pushlinha) {
	           array.push( "{" + values  + "}" );
	        }
	        
		   //alert("values  " + values); 
	   }); 
	    
	   alert("array input ttt " + array); 
	   return array; 
    
}