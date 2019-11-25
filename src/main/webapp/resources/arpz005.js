  		$(document).ready(function(){

			$('#frmprodutobusca').bind('submit',function(e){
	  			e.preventDefault();
	  		});
  		});
  		
   		$("#btnNome").click( function () {
   			
	   		var ambiente = getAmbiente();
   	   			
   			if ($("#txtNome").val() == "")
   			   {alert("Preencha o campo")
   			   } else
   			 	{
	   	   			var idEmpresa = getUrlVars()["param2"];
	   	   			
	   	   		    idEmpresa = idEmpresa.replace('#', '');
	   	   			
	   	   		    arg = "";
	   	   		    arg += ambiente;
	   	   		    arg += '/pessoa/rest/produto/nome/';
	   	   		    arg += idEmpresa;
	   	   		    arg += '/';
	   	   		    arg += $("#txtNome").val();
	   	   		    
	   	   		    getProdutos(arg);

   				}	  			
  		}); 

   		$("#btnCodigo").click( function () {
   			
   			if ($("#txtCodigo").val() == "")
   			   {alert("Preencha o campo")
   			   } else
   			 	{
	   	   			var idEmpresa = getUrlVars()["param1"];
	   		   		var ambiente = getAmbiente();
	   		   		
	   	   		    arg = "";
	   	   		    arg += ambiente;
	   	   		    arg += '/Produto/rest/fisica/doc/';
	   	   		    arg += idEmpresa;
	   	   		    arg += '/';
	   	   		    arg += $("#txtCodigo").attr("tipoProduto");;	   	   		    
	   	   		    arg += '/';
	   	   		    arg += $("#txtCodigo").val().replace(/[^\d]+/g,'');
	   	   		     	   		    
	   	   		    getProdutos(arg);
	   	   		    
   				}		
  		}); 
   		
   		
  		$(document).on("click", ".btn-success", function(){
 			var id = $(this).parent().parent().find(".col-xs-1").text();
 			var url = "";
 			url += './Produto.html?param1=';
 			url += id;
 	        //window.location.href = url;
 	        window.parent.location.href = url; 
    	});

  		function carregarList(json) {

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
			    $("#tableProduto").append(newRow);
  			} else {

	         for (i=0; i < json.length ; i++) {

	            var newRow = $('<tr class="row" id="linhaTabela">');
	            var cols = "";

	            cols += '<td class="col-xs-1">';
	            cols += json[i].id;
	            cols += '</td>';
	            cols += '<td class="col-xs-1">';
	            cols += json[i].codigo;
	            cols += '</td>';
	            cols += '<td class="col-xs-4">';
	            cols += json[i].nome;	  
	            cols += '</td>';	            
	            cols += '<td class="col-xs-1">';
	            cols += json[i].estoque;	  
	            cols += '</td>';	         	            
	            cols += '<td class="col-xs-3">';
	            cols += '<button class="btn btn-success btn-xs" id="btnEditar" type="submit" >Editar</button>';
	            cols += '</td>';

	            newRow.append(cols);
	            $("#tableProduto").append(newRow);
				    }
			    }
  		}
  		function editarProduto(param){
 	  		console.log('Param idxx ---> ' + param.id);
 	  		console.log('Parent idxx ---> ' + param.idTable);
  		}
  		function limparTabela(idTable){
  			var linhas = document.getElementById(idTable);
	  		console.log('Param id ---> ');
  		}
  		function jsonCallback(json){
  			console.log("Entrou logResults");  
  			console.log(json);
		}
		function ConvertFormToJSON(form){
            var array = jQuery(form).serializeArray();
            var json = {};

            jQuery.each(array, function() {
                json[this.name] = this.value || '';
            });

             return json;
        }
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
		function getProdutos(url){
	  		    $.ajax({
   	  		    	type: 'GET',
   	  		    	url: url,
   	  		    	dataType:'json',
   	  		        success:function(response){
   	  		        	$("#tbodyProduto").empty();
   	  		         	carregarList(response);
   	  	
   	  		        },
   	  		        error: function(e, msg) {
   				    console.log(e);
   				    console.log(msg);				    }
   	  		    }); 

		}
