  		$(document).ready(function(){
			$('#frmusuariocadastro').bind('submit',function(e){
	  			e.preventDefault();
	  		});
  		});
  		
  	    window.onload = function(e) {
   			e.preventDefault();  
	        $('#emp').html(sessionStorage.getItem("nome"));
  			if (sessionStorage.getItem("id") == null) {
  				alert("Erro de navegação, faça o login novamente");
  				$("#bntGravar").attr("disabled", true);
  				$("#consultarnome").attr("disabled", true);
  				$("#usuariopage").attr("disabled", true);  		
  				$("#btnNovo").attr("disabled", true);  	  				
  				return;
  			}  			
	    	operacaoGET("/grupo/" + sessionStorage.getItem("id") + "/" + "EMPRESA", "carregarcombos")
	    	limparFormulario(); // criar funcao em util
		    $("#nome").focus();
  			$("#id").val("null");
   		    $('#msg').html("");
   	   		    
	        $('#pessoa').focus();  	
	        
	  	}

		
   		$("#bntGravar").click( function (e) {
   			e.preventDefault();		    
   		    $('#msg').html("");
		    if (consisteForm() == false) {
		       return;	
		    };   			
		    operacaoPOST();		    
  		});	
   		
   		$("#bntGravarAdmin").click( function (e) {
   			e.preventDefault();		    
   		    $('#msgadmin').html("");
		    //if (consisteForm() == false) {
		    //   return;	
		    //};   
   		    
   			var admin  =  '"' + 'id' +'":' + '"' +  "null" + '"';		
   			admin += ',"nome": ' + '"' +  $('#nomeadm').val() + '"'; 
   			admin += ',"tipopessoa": ' + '"' +  'FISICA' + '"';    			
   			admin += ',"documento": ' + '"' +  $('#cpfoucnpj').val() + '"';    
   			admin += ',"tiporelacionamento": ' + '"' +  'ADMINISTRADOR' + '"'; 
   			admin += ',"usuinc": ' + '"' +  'Denilson Peró de Lima' + '"';   
   			admin += ',"dtinclui": ' + '"' +  hoje() + '"';    	
   			admin += ',"empresaid": ' + '"' +  $("#id").val() + '"';     				
   			
		    var usuario = serializeForm($("#dadosadmin :input"), true);
		    usuario = usuario.replace("[","").replace("]","");
		    usuario += ',"idempresa": ' + '"' +  $("#id").val() + '"'; 
		    usuario += ',"nomeempresa": ' + '"' +  $("#nome").val() + '"'; 
		    usuario += ',"perfis": ' + '[1,6]' ; 
	
			var usuarioformatado =  ',"usuarios":' ;
			usuarioformatado +=  "[{";
			usuarioformatado += usuario;
			usuarioformatado += "}]";
				
			//alert("usuarios " + usuarioformatado);
			//return;
   		    //usuario += "[{" ;
			//usuario += "}]" ;
		    
			var emp = ',"empresa":' ;			
			emp  += "{" + '"' + 'id' +'":' + $("#id").val();	
			emp  += "" + ',"' + 'nome' +'":' + '"' + "Empresa Teste SA" + '"' ;
			emp  += "" + ',"' + 'documento' +'":' + '"' + "52.928.736" + '"';
			emp  += "" + ',"' + 'endereco' +'":' + '"' + "Av. do Cursino, 45" + '"';	
			emp  += "" + ',"' + 'cep' +'":' + '"' + "04296-000" + '"';	
			emp  += "" + ',"' + 'cidade' +'":' + '"' + "São Paulo" + '"';		
			emp  += "" + ',"' + 'uf' +'":' + '"' + "sp" + '"';	
			emp  += "" + ',"' + 'status' +'":' + '"' + "ATIVA" + '"';
			emp  += "" + ',"' + 'Contato1' +'":' + '"' + "Contato1" + '"';			
			emp  += "" + ',"' + 'Contato2' +'":' + '"' + "Contato2" + '"';	
			emp  += "" + ',"' + 'Contato3' +'":' + '"' + "Contato3" + '"';			
			emp  += "}" ;	
		    
			
			json  = '{ "@type":"administrador"' + ",";	
			json += admin;
			json += emp;
			json += usuarioformatado;		
			json += "}";

			//console.log(json)
		    //alert("json " + json)
		    //return;
		    
			//usuariocadastrogrv("/usuario/extra", json, "gravarusuariopelaemp")
		    administradorcadastrogrv("/pessoa", json, "gravarfuncionario")	
			
		    //operacaoPOST();		    
  		});	

   		$("#bntEsqueciSenha").click( function (e) {
   			e.preventDefault();		

		    var jsonemail = "{"
		    jsonemail += '"email": ' + '"' +  $("#email").val() + '"';  
		    jsonemail += "}"
		    	
		   	esquecisenha("/auth/forgot", jsonemail, "")	
		    	
  		});	
 
   		$("#gerarprodutos").click( function (e) {
   			e.preventDefault();	
   			
   		 
  			if ($("#id").val() == "null") {
  				alert("selecione a Empresa  !");
  				return;
  			}  
   			gerarprodutos("/empresa/mokproduto/" + $("#id").val(), "", "")	
		    	
  		});	
   		
   		$(document).on("keyup", function(e) { 
   			if ( e.altKey && ( e.which == 78 ) ) { //ALT + N
			   $('#btnNovo').trigger('click');
   			}
   			if ( e.altKey && ( e.which == 80 ) ) { // ALT + P
 			   $('#consultarnome').trigger('click');
    			}   			
   		});
   		
		//Pesquisa por nome no modal
   		$(document).on('click', '#btnPesquisarNome', function(e){
   			e.preventDefault();
   				
   			if ($("#txtPesqNome").val() == "")
   			   {alert("Preencha o campo")
   				$("#txtPesqNome").focus();
   			   } else
   			 	{
	   	   		    arg = "";
	   	   		    arg += getAmbiente();;
	   	   		    arg += '/empresa/nome/';
	   	   		    arg += $("#txtPesqNome").val();	   	   		    
	   	   		    consultaPorNome(arg);
   				}	  							
  		}); 
   		
  		$("#btnARPZ").click( function (e) {
   			e.preventDefault();
   			
   		    $('#msg').html("");
  			
		    empresa = '';	    
		    empresa += '"' + 'empresa' + '"' + ": {" ; 
		    empresa += '"id": ' + '' +  "1" + '';
		    empresa += ',"nome": ' + '"' + "Empresa Teste SA" + '"';
		    empresa += ',"documento": ' + '"' + "4555" + '"';	
		    empresa += ',"endereco": ' + '"' + "Av. padre arlindo" + '"';	
		    empresa += ',"cep": ' + '"' + "042972000" + '"';	
		    empresa += ',"cidade": ' + '"' + "São Paulo" + '"';	
		    empresa += ',"uf": ' + '"' + "sp" + '"';		
		    empresa += ',"status": ' + '"' + "ativo" + '"';	
		    empresa += ',"contato1": ' + '"' + "contato1" + '"';				    
		    empresa += ',"contato2": ' + '"' + "contato2" + '"';	
		    empresa += ',"contato3": ' + '"' + "contato3" + '"' + "}" ;	
		    
			json  = "{";	
			json += empresa;	
			json += "}";
			
			//alert(json);
  	   		$.ajax({
  			  	type: 'POST',
  		    	url: getAmbiente() + "/empresa/arpz",
  		    	contentType: 'application/json;charset=utf-8',
  		    	method: 'POST',
				cache: false,
  		        data: json , 
	            beforeSend : function (xhr){
	            	xhr.setRequestHeader('Authorization', sessionStorage.getItem("arpz"))
	            },  		        
  		        success:function(response){	
  		        	 $('#msg').html("Inclusão efetuada com sucesso !!!");	
  		             $('#msg').css("color","blue");
  		        } ,
  		        error:	function(request, status, error) {	 
	  		       	switch (request.status) { 
	  		      	case 422: 
	  		        	data = JSON.parse(JSON.stringify(request.responseJSON));
	  		        	alert(JSON.stringify(data['errors']).replace(/"fieldName":/g,"").replace(/"message":/g,"").replace(/,/g,"\n"));		  		      		
	  		      		break;
	  		      	default:
	  		        	 $('#msg').html( "Erro *** " + JSON.stringify(request.responseJSON));  
	  		             $('#msg').css("color","red");
	  		        }	  		        	
			    }			    
  	  		});
  		});	   		

  		//Tabelas
   		$("#tabelaempresa").click( function (e) {  	
   			e.preventDefault();
 
  			if ($("#id").val() == "null") {
  				alert("selecione a Empresa  !");
  				return;
  			}  
   			empresatabela("/grupo/tabela/" + $("#id").val(),"", "gravartabela")
   			
  		}); 
   		
  		//Chama modal pesquisa
   		$("#consultarnome").click( function (e) {  	
   			e.preventDefault();
           $('#modalPesquisa').modal('toggle');
  		});     		
   		
   		//btnEditar no modal pesquisa
  		$(document).on("click", "#btnSelecionarRelacionamento", function(e){	
   			e.preventDefault();
			
  			$("#id").val($(this).parent().parent().find(".col-xs-1").text()); 	
  			$("#nome").val($(this).parent().parent().find(".col-xs-6").text()); 	
  			$('#btnPesqFechar').trigger('click');
  			
  			var ambiente = getAmbiente();
	   			
   			if ($("#txtPesqNome").val() == "")
   			   {alert("Preencha o campo")
   				$("#txtPesqNome").focus();
   			   } else
   			 	{
	   	   		    arg = "";
	   	   		    arg += ambiente;
	   	   		    arg += '/empresa/';
	   	   		    arg += $("#id").val();	   	   		    
	   	   		    consultaPorId(arg);
 		        	//sessionStorage.setItem("id", $('#id').val());
  		        	//sessionStorage.setItem("id2", "SUPER");	   	   		    
   			 	}    
  			
    	}); 		
   		$("#btnNovo").click( function (e) {
  			e.preventDefault();
  			limparFormulario(); // criar funcao em util
		    $("#nome").focus();
  			$("#id").val("null");
   		    $('#msg').html("");
  		});	   		

   		$("#usuariopage").click( function (e) {
  			e.preventDefault();
  			if ($("#id").val() == "null") {
  				alert("Inclua a Empresa antes de cadastrar o usuário !");
  				return;
  			}  			
  			if (sessionStorage.getItem("id") == "1" ) {
  				alert("Operação não permitida !");
  				return;
  			}  			
	 	    window.parent.location.href = getAmbiente() +  "/usuariocadastro.html"; 
  		});	  
		
   		function consisteForm() { 			
   			if ($("#nome").val() == "") {
   			    alert("Nome inválido"); 	
   		        $("#nome").focus();
   				return false;
   			}  
   			
   		}

    	function limparFormulario(){
   			$('#empresacadastro').each (function(){
   	   			  this.reset();
   	   			});
   	  }; 
 
 	function consultaPorId(url){
	    $.ajax({
		    	type: 'GET',
		    	url: url,
		    	dataType:'json',
	            beforeSend : function (xhr){
	            	xhr.setRequestHeader('Authorization', sessionStorage.getItem("arpz"))
	            },
		        success:function(response){
		        	carregarEmpresa(response);
		        },
		        error: function(e, msg) {
		            console.log(e);
		            console.log(msg);
		        }
		    }); 
    }
 	
 	function carregarEmpresa(json){

		//$("#email").attr("disabled", true);
        $("#documento").focus();

		$('#documento').val(json.documento).mask("000.000.000-00"); 
		$('#nome').val(json.nome); 
	   	$("#segmento option:selected").text(json.segmento);
		if (json.status != null){
	      	$("#status option:selected").text(json.status);  
		}	   	
	   	$("#status option:selected").text(json.status);	   	
		$('#cep').val(json.cep); 
		$('#cidade').val(json.cidade); 		
		$('#uf').val(json.uf); 
		$('#contato1').val(json.contato1); 		
		$('#contato2').val(json.contato2); 	
		$('#contato3').val(json.contato3); 			
    }   	
   	function consultaPorNome(url){
	    $.ajax({
		    	type: 'GET',
		    	url: url,
		    	dataType:'json',
	            beforeSend : function (xhr){
	            	xhr.setRequestHeader('Authorization', sessionStorage.getItem("arpz"))
	            },
		        success:function(response){
		         	carregarRelacionamento(response);
		        },
  		        error:	function(request, status, error) {	  		        	
	  		       	switch (request.status) { 
	  		      	case 403: 
	  		        	alert("Usuário não autorizado para esta operação");		  		      		
	  		      		break;
	  		      	default:
	  		        	 alert(JSON.stringify(request.responseJSON));		
	  		        }	  		        		  		      				            
		        }
		    }); 

    }
	function carregarRelacionamento(json) {

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
	  	    
            cols += '<td class="col-xs-1">';
            cols += json[i][0];
            cols += '</td>';            
            cols += '<td class="col-xs-6">';
            cols += json[i][1];
            cols += '</td>';	            
            cols += '<td class="col-xs-3"></td>';
            
            cols += '<td class="col-xs-3">';
            cols += '<button  class="btn btn-success btn-xs " id="btnSelecionarRelacionamento"  type="submit" >Selecionar</button>';
            cols += '</td>';

            newRow.append(cols);
            $("#tablePesquisa").append(newRow);
			    }
		    }
		}
   		function sonumeros( string )
   		{
   			var novastring = string.replace(/[\.-]/g, "");
   			alert( novastring );
   			return novastring;
   		};