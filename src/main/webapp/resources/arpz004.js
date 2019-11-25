  		$(document).ready(function(){

			$('#frmcadastro').bind('submit',function(e){
	  			e.preventDefault();
	  		});
  		});

  		$("#optFisica").click( function () {
  			$("#txtDocumento").attr("tipopessoa", "F");
  			$("#txtDocumento").mask("000.000.000-00");
  		});
   		$("#optJuridica").click( function () {
  			$("#txtDocumento").attr("tipopessoa", "J");
  			$("#txtDocumento").mask("00.000.000/0000-00");
  		});
  		
   		
   		$("#bntNovoCliente").click( function ()  {
            var first = getUrlVars()["param1"];
 			var url = "";
 			url += './pessoa.html?param1=null';
 			url += '&param2='
 	 		url += first		
 	 		url += '&param3=CLIENTE'
 	        window.parent.location.href = url;    
  		}); 
   		  	   		
   		
   		$("#btnNome").click( function () {
   			
	   		var ambiente = getAmbiente();
   	   			
   			if ($("#txtNome").val() == "")
   			   {alert("Preencha o campo")
   			   } else
   			 	{
	   	   			var idEmpresa = getUrlVars()["param1"];
	   	   			
	   	   		    idEmpresa = idEmpresa.replace('#', '');
	   	   		    
	   	   		    arg = "";
	   	   		    arg += ambiente;
	   	   		    arg += '/pessoa/rest/cliente/nome/';
	   	   		    arg += idEmpresa;
	   	   		    arg += '/';
	   	   		    arg += $("#txtNome").val();
	   	   		    
	   	   		   // alert("get pessoa " + arg);
	   	   		    
	   	   		    getPessoas(arg);

   				}	  			
  		}); 

   		$("#btnDocumento").click( function () {
   			
   			if ($("#txtDocumento").val() == "")
   			   {alert("Preencha o campo")
   			   } else
   			 	{
	   	   			var idEmpresa = getUrlVars()["param1"];
	   		   		var ambiente = getAmbiente();
	   		   		
	   	   		    arg = "";
	   	   		    arg += ambiente;
	   	   		    arg += '/pessoa/rest/fisica/doc/';
	   	   		    arg += idEmpresa;
	   	   		    arg += '/';
	   	   		    arg += $("#txtDocumento").attr("tipopessoa");;	   	   		    
	   	   		    arg += '/';
	   	   		    arg += $("#txtDocumento").val().replace(/[^\d]+/g,'');
	   	   		     	   		    
	   	   		    getPessoas(arg);
	   	   		    
   				}		
  		}); 
   		
   		$("#liIncluirCli").click( function () {
            var first = getUrlVars()["param1"];
 			var url = "";
 			url += './pessoa.html?param1=null';
 			url += '&param2='
 	 		url += first		
 	 		url += '&param3=CLIENTE'
 	        window.parent.location.href = url;    
  		}); 
   		  	   		
   		$("#liIncluirFor").click( function () {
            var first = getUrlVars()["param1"];
 			var url = "";
 			url += './pessoa.html?param1=null';
 			url += '&param2='
 	 		url += first	
 			url += '&param3=FORNECEDOR'
 	        window.parent.location.href = url;    
  		}); 
   		   		
   		
  		$(document).on("click", ".btn-success", function(){
 			var id = $(this).parent().parent().find(".col-xs-1").text();
 			var url = "";
 			url += './pessoa.html?param1=';
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
			    $("#tablePessoa").append(newRow);
  			} else {

	         for (i=0; i < json.length ; i++) {

	            var newRow = $('<tr class="row" id="linhaTabela">');
	            var cols = "";

	            cols += '<td class="col-xs-1">';
	            cols += json[i].id;
	            cols += '</td>';
	            cols += '<td class="col-xs-3">';
	            cols += json[i].nome;
	            cols += '</td>';	            
	            cols += '<td class="col-xs-3"></td>';
	            cols += '<td class="col-xs-3">';
	            cols += '<button class="btn btn-success btn-xs" id="btnEditar" type="submit" >Pedido</button>';
	            cols += '</td>';

	            newRow.append(cols);
	            $("#tablePessoa").append(newRow);
				    }
			    }
  		}
  		function editarPessoa(param){
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
		function getPessoas(url){
	  		    $.ajax({
   	  		    	type: 'GET',
   	  		    	url: url,
   	  		    	dataType:'json',
   	  		        success:function(response){
   	  		        	$("#tbodyCliente").empty();
   	  		         	carregarList(response);
   	  	
   	  		        },
   	  		        error: function(e, msg) {
   				    console.log(e);
   				    console.log(msg);				    }
   	  		    }); 

		}
