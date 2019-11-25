  		$(document).ready(function(){
			$('#vendedorcadastro').bind('submit',function(e){
	  			e.preventDefault();
	  		});
  		});
   		
  	    window.onload = function() {  
  	    	 	    	
  	    	  iniciarFormulario();
  	    	  
  	    	  sessionStorage.setItem("id","1");
  	    	  sessionStorage.setItem("nome","EMPRESA TESTE NO LOAD SA")
  	    	  
  	      	  $('#emp').html(sessionStorage.getItem("nome"));
  	    	  operacaoGET("/grupo/" + sessionStorage.getItem("id") +  "/"  + $("#tiporelacionamento").val(), "carregarcombos")
	    				  				
  	  	}  	//document load close;	

        $("#bntEditarDoc").click( function (e) {
     		e.preventDefault();
     		
    		if ($("#documento").val() == "") {
    			alert("Documento inválido")
       		    $("#documento").focus();
       			return ;
    		}	

    		if ($("#documento").val() != "") {
       			if (consisteCNPJ_CPF($("#tipopessoa option:selected").text(),$("#documento").val())){ 
       			} else {
       		        $("#documento").focus();
       				return false;}
    		}	
    		var doc = $("#documento").val()
  			var url = getAmbiente() + "/pessoa/documento/"  + sessionStorage.getItem("id") +  "/" + $("#tiporelacionamento").val() + "/" + $("#documento").val().replace("/","+").replace(".","x").replace(".","x");
  			
  			iniciarFormulario();
  			
  			$("#documento").val(doc);
  			consultarVendedor(url)     		
        })
        
     		
        $("#gravarvendedorcadastro").click( function (e) {
     		e.preventDefault();
     		     		
		    //if (consistirFormulario() == false) {
			//       return;	
			//};    
			    
     		var cadastro = serializeForm($("#cadastro :input"),true)
     	    cadastro = cadastro.replace("[","").replace("]","");
     		cadastro += ',"id": ' + '"' + $('#id').val() + '"';
     		cadastro += ',"tipopessoa": ' + '"' +  $('#tipopessoa').val() + '"';     		
     		cadastro += ',"documento": ' + '"' +  $('#documento').val() + '"';  
     		cadastro += ',"nome": ' + '"' +  $('#nome').val() + '"'; 
     		
     		var empresa =  ',"' + 'empresa' +'"' + ":" ; 
     		empresa +=getEmpresa()

     		var enderecos =  ',"' + 'enderecos' +'"' + ":[" ; 
     		enderecos += serializeFormOccurs($("#endereço :input"),8)
     		enderecos += "]"     
     			
     		var contatos = "["
    	    contatos += serializeFormOccurs($("#contato :input"),5)  
     		contatos += "]"      		    	
     		
     		data = $.parseJSON(contatos);

     		var jsoncontatoitens =  ',"' + 'contatos' +'"' + ":[" ; 
     		
 			$('#licontatodinamico #expandircontatoitens').each(function(i, element) {

 				  jsoncontatoitens += JSON.stringify(data[i]).replace("}","") 
 				  
				   if(typeof($(this).attr("jsonitens"))  != "undefined") {					   
					   jsoncontatoitens += ',"' + 'contatostipo' +'"' + ":" ; 
		 		 	   jsoncontatoitens += $(this).attr("jsonitens")
				   }
 				  
 				   jsoncontatoitens += "},"
 				   			   				   
 		   	})
			
 		   	jsoncontatoitens +=  ']' ; 
 			jsoncontatoitens = jsoncontatoitens.replace(",]","]");

     		json  = "{" + '"' + '@type":"vendedor' +'",';	
			json += cadastro;	
			json += empresa;
			json += enderecos;	
			json += jsoncontatoitens;	
			json += "}";
			
	   	    //console.log("json ... "  + json); 	
 			  
  	   		$.ajax({
  			  	type: 'POST',
  		    	url: getAmbiente() + "/pessoa",
  		    	contentType: 'application/json;charset=utf-8',
  		    	method: 'POST',
				cache: false,
  		        data: json, 
	            beforeSend : function (xhr){
	            	//xhr.setRequestHeader('Authorization', sessionStorage.getItem("arpz"))
	            },
  		        success:function(response){	
  		        	atualizarVendedor(response);
  		        	 $('#msg').html("Operação realizada com sucesso !!!");	
  		             $('#msg').css("color","blue");
  		        } ,
  		        error:	function(request, status, error) {	  		        	
	  		       	switch (request.status) { 
	  		      	case 422: 
	  		        	data = JSON.parse(JSON.stringify(request.responseJSON));
	  		        	alert(JSON.stringify(data['errors']).replace(/"fieldName":/g,"").replace(/"message":/g,"").replace(/,/g,"\n"));		  		      		
	  		      		break;
	  		      	case 403: 
	  		        	alert("Usuário não autorizado !!!");		  		      		
	  		      		break;	  		      			  		      		
	  		      	default:
	  		        	 $('#msg').html( "Erro *** " + JSON.stringify(request.responseJSON));  
	  		             $('#msg').css("color","red");
	  		        }	  		        	
			    }			    
  	  		});	    	    
         }); 
        
        $("#novovendedorcadastro").click( function (e) {
     		e.preventDefault();
	    	iniciarFormulario();
         });
        
   		$("#tipopessoa").change( function () {		
	  		$("#tipopessoa option:selected").each(function() {
	  			configurarPessoa($("#tipopessoa option:selected").text());
	  		}); 
  		});
   		
   	    $('#adicionarendereco').keyup(function(event){
			switch(event.keyCode) {
				case 13:
					('#adicionarendereco').trigger('click');
	 		    	break; 		    	
	 		    default:
	 		}
     	});

     	$(document).on("click", "#adicionarendereco", function(e){
  			e.preventDefault(); 
	    	
  			switch($(this).children('span').attr('class')) {
   		    case "glyphicon glyphicon-plus":  
   		    	
	   			    if (consistirlinhaEndereco() == false) {
	   				       return;	
	   				};  
   		    	   		    	    
   		    	    $("#linhaendereco #spanadicionarendereco").removeClass("glyphicon glyphicon-plus").addClass("glyphicon glyphicon-ok")
   		    	
     	  			$('.luendereco').prepend("<li id='lienderecodinamico'><div class=row id='lidiv'> " + $("#linhaendereco").html() + " </div></li>")
     	  			$("#logradouro").val($("#linhaendereco #logradouro").val());
     	  			$("#idendereco").val($("#linhaendereco #idendereco").val());
     	  			$("#tipo").text($("#linhaendereco #tipo").text());
     	  			$("#bairro").val($("#linhaendereco #bairro").val());
     	  			$("#cep").val($("#linhaendereco #cep").val());
     	  			$("#cidade").val($("#linhaendereco #cidade").val());
     	  			$("#uf").val($("#linhaendereco #uf").val().toUpperCase()); 
     	  			
     	  			$("#linhaendereco #idendereco").val("null");
     	  			$("#linhaendereco #logradouro").val("");
     	 			$("#linhaendereco #tipo").val("");
     	 			$("#linhaendereco #bairro").val("");
     	 			$("#linhaendereco #cep").val("");
     	 			$("#linhaendereco #cidade").val("");
     	 			$("#linhaendereco #uf").val("");      		    	
   		    	    $(this).children('span').removeClass("glyphicon glyphicon-ok").addClass("glyphicon glyphicon-plus")

     	 		   	$("#linhaendereco #tipoendereco").focus();
   		    	
   		    	break;	
   		    case "glyphicon glyphicon-ok": 	
   		        $(this).children('span').removeClass("glyphicon glyphicon-ok").addClass("glyphicon glyphicon-trash") 
   		    	break;	 
   		    case "glyphicon glyphicon-trash": 	
   		        $(this).children('span').removeClass("glyphicon glyphicon-trash").addClass("glyphicon glyphicon-ok")
   		    	break; 		    	
   		    default:
   			}
  		    //var index = $(this).closest("li").index();
  		    //var tamanho =  ($(".luendereco li").length - 2) //subtraindo o cabeçalho e linha de digitação;
  		    //
  	    
  		    //if (index != tamanho) {  
  		
  	           //$('#modalsimnao').modal('toggle');
  			    //	$(this).closest("li").remove(); 
  	    	
  		    //} 			
      });   	

     	$(document).on("click", "#adicionarcontato", function(e){
			e.preventDefault(); 
		    e.stopPropagation();
    	
			switch($(this).children('span').attr('class')) {
		    case "glyphicon glyphicon-plus":  

   			    if (consistirlinhaContato() == false) {
				       return;	
				};
				
	    	    $("#linhacontato #spanadicionarcontato").removeClass("glyphicon glyphicon-plus").addClass("glyphicon glyphicon-ok")
		    	    
 	  			$('.ulcontato').prepend("<li id='licontatodinamico'><div class=row id='lidivcontato'> " + $("#linhacontato").html() + " </div></li>")
 	  			
 	  			$("#idcontato").val($("#linhacontato #idcontato").val());
 	  			$("#tipocontato").val($("#linhacontato #tipocontato").val());
 	  			$("#nomecontato").val($("#linhacontato #nomecontato").val());
 	  			
 	  			$("#expandircontatoitens").attr("nomesv", $("#linhacontato #nomecontato").val())
 	  			
 	  			$("#linhacontato #idcontato").val("null");
 	  			$("#linhacontato #nomecontato").val("");
 			    $('#linhacontato #expandircontatoitens').attr("jsonitens", "");
 	 			
		    	$(this).children('span').removeClass("glyphicon glyphicon-ok").addClass("glyphicon glyphicon-plus")

 	 		   	$("#linhacontato #tipocontato").focus();
		    	
		    	break;	
		    case "glyphicon glyphicon-ok": 	
		        $(this).children('span').removeClass("glyphicon glyphicon-ok").addClass("glyphicon glyphicon-trash") 
		    	break;	 
		    case "glyphicon glyphicon-trash": 	
		        $(this).children('span').removeClass("glyphicon glyphicon-trash").addClass("glyphicon glyphicon-ok")
		    	break; 		    	
		    default:
			}
     });  
 //---------------------------------------------------    	
     	$(document).on("click", "#adicionarcontatoitens", function(e){
  			e.preventDefault(); 
	    	
  			switch($(this).children('span').attr('class')) {
   		    case "glyphicon glyphicon-plus":  
   		    	
	   			    if (consistirlinhaContatoItens() == false) {
					       return;	
					}   		    	    
   		    	    $("#linhacontatoitens #spanadicionarcontatoitens").removeClass("glyphicon glyphicon-plus").addClass("glyphicon glyphicon-ok")
   		    	
     	  			$('.ulcontatoitens').prepend("<li id='licontatoitensdinamico'><div class=row id='divdinamicacontatoitens'> " + $("#linhacontatoitens").html() + " </div></li>")
     	  			
     	  			$("#idcontatoitens").val($("#linhacontatoitens #idcontatoitens").val());
     	  			$("#tipocontatoitens").val($("#linhacontatoitens #tipocontatoitens").val());
     	  			$("#descricaocontatoitens").val($("#linhacontatoitens #descricaocontatoitens").val());

     	  			$("#linhacontatoitens #idcontatoitens").val("null");     	  			
     	 			$("#linhacontatoitens #descricaocontatoitens").val("");

   		    	    $(this).children('span').removeClass("glyphicon glyphicon-ok").addClass("glyphicon glyphicon-plus")

     	 		   	$("#linhacontatoitens #tipocontatoitens").focus();
   		    	
   		    	break;	
   		    case "glyphicon glyphicon-ok": 	
   		        $(this).children('span').removeClass("glyphicon glyphicon-ok").addClass("glyphicon glyphicon-trash") 
   		    	break;	 
   		    case "glyphicon glyphicon-trash": 	
   		        $(this).children('span').removeClass("glyphicon glyphicon-trash").addClass("glyphicon glyphicon-ok")
   		    	break; 		    	
   		    default:
   			}
      });   	

        $("#consultarnomeusuario").click( function (e) {
     		e.preventDefault();
       	    $('#nomepesquisa').val($('#nome').val());
       	    $('#nomepesquisa').focus();
       	    $("#relac").html("USUÁRIO")
       	    if($('#nome').val() != ""){
       			$('#botaopesquisarnome').trigger('click');    	    	
       	    }

            $('#modalpessoaconsultanome').modal('toggle');
          }); 
        
      $("#consultarnome").click( function (e) {
 		e.preventDefault();
   	    $('#nomepesquisa').val($('#nome').val());
   	    $('#nomepesquisa').focus();
   	    $("#relac").html($("#tiporelacionamento").val())
   	    if($('#nome').val() != ""){
   			$('#botaopesquisarnome').trigger('click');    	    	
   	    }

        $('#modalpessoaconsultanome').modal('toggle');
      });  

	  $('#modalpessoaconsultanome').on('shown.bs.modal', function (e) {
	   		e.preventDefault(); 
	  })	

	  $(document).on("click", "#botaopesquisarnome", function(e){	
   			e.preventDefault();	  

		if ($("#nomepesquisa").val() == "")
		   {alert("Preencha o campo")
			$("#nomepesquisa").focus();
		     return;
		   } 
   	    
   	      switch ($("#relac").html()) {
			  case "USUÁRIO":
					var url = getAmbiente() + "/usuario/nome/" + sessionStorage.getItem("id") + "/" + $("#nomepesquisa").val()
					operacaoGET(url, "consultarusuarionome")				  
					break;
			  case "VENDEDOR":
					var url = getAmbiente() + "/pessoa/nome/" + sessionStorage.getItem("id") +  "/"  + $("#tiporelacionamento").val() + "/" + $("#nomepesquisa").val()
					operacaoGET(url, "consultarpessoanome")			  
					break;				
			  default:
	                alert("Tipo de relacionamento não previsto para consulta")
					break;
			  }	 
      }); 

		$(document).on("click", "#selecionarpessoaitem", function(e){	
 			e.preventDefault();
 			
  			$("#id").val($(this).parent().parent().find(".col-xs-1").text()); 	
  			$("#nome").val($(this).parent().parent().find(".col-xs-6").text()); 	
  			$('#pessoaconsultanomefechar').trigger('click'); 
  			
  			var url = getAmbiente() + "/vendedor/"  + $("#id").val() 

  			consultarVendedor(url)
 			
	    });
				
		$(document).on("click", "#selecionarpessoa", function(e){	
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
 		        	sessionStorage.setItem("id", $('#id').val());
  		        	sessionStorage.setItem("id2", "SUPER");	   	   		    
   			 	}    
  			
    	}); 
		
   	  $(document).on("click", "#contatoitensfechar", function(e){
 			e.preventDefault();
     		
 			var contatos = "["
     	    contatos += serializeFormOccurs($(".ulcontatoitens :input"),4)
		    contatos +=  "]" ;	

		   $('#licontatodinamico #expandircontatoitens').each(function(i, element) {
			   if(i == $("#modalcontatoitenslinha").val()){
				   $(this).attr("jsonitens", contatos)				   				   
			   }
	    	}); 		    		    
		});      
//----------------------------------------------------------------------------------------      
   	 $(document).on("click", "#expandircontatoitens", function(e){
		   e.preventDefault(); 

		   if ($(this).parents('li').attr('class') == "licontato") {  //linha de digitação
			   return;
		   }
		   
		   $('.ulcontatoitens #licontatoitensdinamico').each(function(index, element) {
			   element.remove();
	    	});
		    
		   var json = "";
		   
		   if(typeof($(this).attr("jsonitens"))  == "string" && $(this).attr("jsonitens") != "") {
			    json = JSON.parse($(this).attr('jsonitens'));	
		   } 
		   
		   for (i=0; i < json.length ; i++) {

	  			$("#linhacontatoitens #idcontatoitens").val(json[i].id);
	  			$("#linhacontatoitens #tipocontatoitens").val(json[i].tipo);
 	  			$("#linhacontatoitens #descricaocontatoitens").val(json[i].descricao);
 	  			
				$('.licontatoitens #adicionarcontatoitens').trigger('click');	  			
		   }		   
		   
		   $('#modalcontatoitenslinha').val($(this).closest("li").index())
		   
   	       $('.modal-title').html($(this).attr("nomesv")); 
           $('#modalcontatoitens').modal('toggle');
           
       }); 
//----------------------------------------------------------------------------------------
	  $('#modalcontatoitens').on('shown.bs.modal', function (e) {
   		e.preventDefault();   
   	    $('#tipocontatoitens').focus();
     })	
//----------------------------------------------------------------------------------------  
     /*
  	$("#expandircontatoitens").click( function (e) {
  			e.preventDefault();
  					
  		    $(".ulcontatoitens").find(">ul").toggle("slow");
  		    if ($(".ulcontatoitens").hasClass("active")) {
  		        $(".ulcontatoitens").removeClass("active");
  		    }   else {
  		    	$(".ulcontatoitens").addClass("active")
  		          };  		    		    
  		});  
     */
     
  	function configurarPessoa(pessoa){
		switch (pessoa) {
		  case "FISICA":			  
				$("#nomefantasia").mask("00/00/0000");
				$("#nmfanta").html("Data Nascimento");;
			    $("#nome").html("Nome");
     		    $("#cnh").html("CNH");
				$("#rg").html("RG");
	  			$("#lbldocumento").html("CPF");				
	 			$("#documento").mask("000.000.000-00");
				break;
		  default:
				//$("#nomefantasia").mask("");	
		    	$("#nmfanta").html("Nome Fantasia");;	  
				$("#nome").html("Razão Social");
			    $("#cnh").html("Inscrição Municipal");
				$("#rg").html("Inscrição Estadual");
	  			$("#lbldocumento").html("CNPJ");					
	 			$("#documento").mask("00.000.000/0000-00");
				break;
			}		
	}  

  	function iniciarFormulario(){
   	   
  	    limparFormulario() 
  	    
	    $('#id').val("null");
		$("#cepnf").mask("00000-000");
		$("#cep").mask("00000-000");
		$("#tiporelacionamento").val("VENDEDOR");
		
		$('#msg').html("");	

		
	    $('.luendereco #lienderecodinamico').each(function(index, element) {
		   element.remove();
    	});
	    
	    $('.ulcontato #licontatodinamico').each(function(index, element) {
		   element.remove();
    	});

	    $('.ulcontatoitens #linhacontatoitensdinamico').each(function(index, element) {
			   element.remove();
	    	});
	    
	    configurarPessoa("JURIDICA");
	    
        $('#tipopessoa').focus();   		
	} 
	function limparFormulario(){
			$('#vendedorcadastro').each (function(){
	   			  this.reset();
	   			});
	  };  	
	function consistirFormulario() {
   			
		if ($("#tipopessoa").val() == "") {
		    alert("Escolha um tipo de pessoa"); 	
	        $("#tipopessoa").focus();
			return false;
		}

		if ($("#documento").val() != "") {
   			if (consisteCNPJ_CPF($("#tipopessoa option:selected").text(),$("#documento").val())){ 
   			} else {
   		        $("#documento").focus();
   				return false;}
		}		
		
		if ($("#nome").val() == "") {
		    alert("Nome deve ser informado"); 	
	        $("#nome").focus();
			return false;
		}
		
		if ($("#tipopessoa").val() != "JURIDICAXX") {  //FORÇANDO INVALIDAR PARA REAVALIAR
			if ($("#endereconf").val() == "") {
			    alert("Endereço da Nota Fiscal deve ser informado"); 	
		        $("#endereconf").focus();
				return false;
			}
			if ($("#cepnf").val() == "") {
			    alert("Cep da Nota Fiscal deve ser informado"); 	
		        $("#cepnf").focus();
				return false;
			}
			if ($("#bairronf").val() == "") {
			    alert("Bairro da Nota Fiscal deve ser informado"); 	
		        $("#bairronf").focus();
				return false;
			}
			if ($("#cidadenf").val() == "") {
			    alert("Cidade da Nota Fiscal deve ser informado"); 	
		        $("#cidadenf").focus();
				return false;
			}	
			if ($("#ufnf").val() == "") {
			    alert("UF da Nota Fiscal deve ser informado"); 	
		        $("#ufnf").focus();
				return false;
			}			
		}		
	}
	function consistirlinhaEndereco() {
			
		if ($(".liendereco #tipoendereco").val() == "") {
		    alert("Escolha um tipo de endereco"); 	
	        $(".liendereco #tipopessoa").focus();
			return false;
		}
		
		if ($(".liendereco #logradouro").val() == "") {
		    alert("Endereço deve ser informado"); 	
	        $(".liendereco #logradouro").focus();
			return false;
		}
		if ($(".liendereco  #cep").val() == "") {
		    alert("Cep deve ser informado"); 	
	        $(".liendereco #cep").focus();
			return false;
		}

		if ($(".liendereco #cidade").val() == "") {
		    alert("Cidade deve ser informado"); 	
	        $(".liendereco #cidade").focus();
			return false;
		}	
		if ($(".liendereco #uf").val() == "") {
		    alert("UF deve ser informado"); 	
	        $(".liendereco #uf").focus();
			return false;
		}					
	}	
	function consistirlinhaContato() {
		
		if ($(".licontato #tipocontato").val() == "") {
		    alert("Escolha um tipo de contato"); 	
	        $(".licontato #tipocontato").focus();
			return false;
		}
		
		if ($(".licontato #nomecontato").val() == "") {
		    alert("Nome do contato deve ser informado"); 	
	        $(".licontato #nomecontato").focus();
			return false;
		}			
	}
	function consistirlinhaContatoItens() {
		
		if ($(".licontatoitens #tipocontatoitens").val() == "") {
		    alert("Escolha um tipo de contato"); 	
	        $(".licontatoitens #tipocontatoitens").focus();
			return false;
		}
		
		if ($(".licontatoitens #descricaocontatoitens").val() == "") {
		    alert("Descrição do  do contato deve ser informado"); 	
	        $(".licontatoitens #descricaocontatoitens").focus();
			return false;
		}			
	}
	
	function atualizarVendedor(jsonparam){
			
		iniciarFormulario();
			
		var json = jsonparam;

        $("#cpfoucnpj").focus();
	    
		$('#id').val(json.id); 
		$('#tipopessoa option:selected').text(json.tipopessoa);	
		if ($('#tipopessoa') == "JURIDICA"){
			$('#documento').val(json.documento); 
		} else {
			$('#documento').val(json.documento); 	
		     }		
		$('#nome').val(json.nome);  
		
		$('#nomefantasia').val(json.nomefantasia);  			
		$('#inscestadual').val(json.inscestadual);  	
		$('#inscmunicipal').val(json.inscmunicipal);  	
		$('#endereconf').val(json.endereconf);  	
		$('#cepnf').val(json.cepnf);  	
		$('#bairronf').val(json.bairronf);  	
		$('#cidadenf').val(json.cidadenf);  	
		$('#ufnf').val(json.ufnf);  	
		$('#tiporelacionamento').val(json.tiporelacionamento);  	

	    $.each(json.enderecos, function(i, item) {
		  	  
	    	  //alert("carregando endereços " + i)
		  	  $('#linhaendereco #idendereco').val(item.id);  
			  $('#linhaendereco #tipoendereco option:selected').text(item.tipo);	
		  	  $('#linhaendereco #logradouro').val(item.logradouro);  
		  	  $('#linhaendereco #bairro').val(item.bairro);  
		  	  $('#linhaendereco #cep').val(item.cep);  
		  	  $('#linhaendereco #cidade').val(item.cidade);  
		  	  $('#linhaendereco #uf').val(item.uf);
		  	  
			  $('#linhaendereco #adicionarendereco').trigger('click');		  	  
		 });  

		   
	    $.each(json.contatos, function(i, item) {
	
	    	  var contatositens = JSON.stringify(item['contatostipo'])
	    	  //contatositens = contatositens.replace("]","").replace("[","")

		  	  $('#linhacontato #idcontato').val(item.id);  
			  $('#linhacontato #tipocontato option:selected').text(item.tipo);	
		  	  $('#linhacontato #nomecontato').val(item.nome);  
		  	  
		  	  $('#linhacontato #expandircontatoitens').attr("jsonitens", contatositens);

			  $('#linhacontato #adicionarcontato').trigger('click');	
					  
		 }); 	    

	}	
	function carregarPessoaNome(json) {

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
        cols += '<td class="col-xs-4">';
        cols += json[i][1];
        cols += '</td>';	            
        cols += '<td class="col-xs-2">' 
        cols += json[i][2];        	
        cols +=	'</td>';
        cols += '<td class="col-xs-4">' 
        cols += json[i][3] + "/" + json[i][4];        	
        cols +=	'</td>';        
        cols += '<td class="col-xs-3">';
        cols += '<button  class="btn btn-success btn-xs " id="selecionarpessoaitem"  type="submit" >Selecionar</button>';
        cols += '</td>';

        newRow.append(cols);
        $("#tablePesquisa").append(newRow);
		    }
	    }
	}
	
