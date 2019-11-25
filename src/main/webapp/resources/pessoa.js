  		$(document).ready(function(){

			$('#frmcadastro').bind('submit',function(e){
	  			e.preventDefault();
	  		});
  		});
   		
  	    window.onload = function() {
  	    	
  				$('#txtLink').val("Null");
  	  			$("#txtnascimento").mask("00/00/0000");
  	  			
  				$("#txtempresa").val(getUrlVars()["param1"]);
  				$("#txtRelac").val(getUrlVars()["param3"]);
  				
  				switch($("#txtRelac").val()) {
  	 		    case "VENDEDOR":
  	 		    	$("#cboPessoa option:selected").text("FISICA");
  	 		    	$("#cboPessoa").prop( "disabled", true );
  	 		    	$("#txtdocumento").focus();  	 		    	
  	 		    	break;	    	
  	 		    default:
  	 		    	$("#cboPessoa option:selected").text("JURIDICA");
  	 			}
  	 			
  	  			configurarPessoa($("#cboPessoa option:selected").text());

  		        $('#cboPessoa').focus();  			
  				
  	  	}  	//document load close;	    
  		//Modal endereço lançado ****
  		$('#myModal').on('shown.bs.modal', function () {
  			
           $('#txtendEndereco').focus();
 		   $("#txtendCep").mask("00000-000");

	       if ($("#txtParam").val() == "null") {   		
	           $('#txtendId').val("0") ;
	           $('#txtendTipo').val("COMERCIAL") ;
	           $('#txtendEndereco').val("") ;
	           $('#txtendBairro').val("") ;
	           $('#txtendCep').val("") ;
	           $('#txtendCidade').val("") ;
	           $('#txtendEstado').val("") ;  
	           $('#txtendItem').val("") ;	 		   
	       } else {

	           var json = jQuery.parseJSON( $("#txtParam").val() );
	           
	           $('#txtendId').val(json.ID) ;
	           $('#txtendTipo').val(json.Tipo) ;
	           $('#txtendEndereco').val(json.Endereço) ;
	           $('#txtendBairro').val(json.Bairro) ;
	           $('#txtendCep').val(json.Cep) ;
	           $('#txtendCidade').val(json.Cidade) ;
	           $('#txtendEstado').val(json.UF) ;
	       }                
  		})

		$("#txtnome").blur(function(){
			if ($("#txtnomebusca").val() == ""){
				$("#txtnomebusca").val($("#txtnome").val());
			}
		});   
  		
  		//Modal contato lançado ****
  		$('#ContatosModal').on('shown.bs.modal', function () {
  			
           $('#txtcontNome').focus();
 		   
	       if ($("#txtParam").val() == "null") {
	    	   
	           $('#txtcontId').val("0") ;
	           $('#txtcontTipo').val("COMERCIAL") ;
	           $('#txtcontNome').val("") ;
	           $('#txtcontTelefone').val("") ;
	           $('#txtcontNextel').val("") ;
	           $('#txtcontCelular1').val("") ;
	           $('#txtcontCelular2').val("") ;    
	           $('#txtcontEmail1').val("") ; 	
	           $('#txtcontEmail2').val("") ; 	 	 	           
	       } else {
	    	   
	           var json = jQuery.parseJSON( $("#txtParam").val() );
	           
	           $('#txtcontId').val(json.ID) ;
	           $('#txtcontTipo').val(json.Tipo) ;
	           $('#txtcontNome').val(json.Nome) ;
	           $('#txtcontTelefone').val(json.Telefone) ;
	           $('#txtcontNextel').val(json.Nextel) ;
	           $('#txtcontCelular1').val(json.Celular1) ;
	           $('#txtcontCelular2').val(json.Celular2) ;
	           $('#txtcontEmail1').val(json.eMail1) ; 	
	           $('#txtcontEmail2').val(json.eMail2) ; 	 		           
	       }                
  		})

   		$("#btnPesquisarDocumento").click( function () {
           if (consisteCNPJ_CPF($("#cboPessoaPesquisa option:selected").text(),$('#txtPesqDocumento').val())){
    		  	var ambiente = getAmbiente();
   	   			var idEmpresa = getUrlVars()["param1"];
   	   	   		    idEmpresa = idEmpresa.replace('#', '');
   	   	   			
   	   	   		    arg = "";
   	   	   		    arg += ambiente;
   	   	   		    arg += '/pessoa/rest/fisica/doc/';
   	   	   		    arg += idEmpresa;
   	   	   		    arg += '/';
   	   	   		    arg += $("#cboPessoaPesquisa option:selected").text().substr(0,1);
   	   	   		    arg += '/';   	   	   		    
   	   	   		    arg += $("#txtPesqDocumento").val();
   	   	   		    
   	   	   		    getRelacionamento(arg);
       				}
        	   else {
       	          $('#txtPesqDocumento').focus();
        	   }   
  		});
  		
  		//Chama modal de endereço para incluir endereço
   		$("#bntIncluirEnd").click( function () {

	         $('#txtParam').val("null");

             $('#myModal').modal('toggle');
  		});

  		
  		//Chama modal para incluir contato
   		$("#bntIncluirCont").click( function () {
	         $('#txtParam').val("null");
             $('#ContatosModal').modal('toggle');
  		});
   		
  		//Chama modal pesquisa
   		$("#bntConsultar").click( function () {
  		   
 		   $("#cboPessoaPesquisa option:selected").text("JURIDICA");				
 		   $("#txtPesqDocumento").mask("00.000.000/0000-00");
             $('#modalPesquisa').modal('toggle');
  		});  
   		
  		//Grava dados Pessoa 
   		$("#btnVoltar").click( function () {
 			var url = "";
 			url += './pessoabusca.html?param1=';
 			url += $("#txtempresa").val();

 	        window.parent.location.href = url;   
 	        
  		});
   		
  		//Grava dados Pessoa 
   		$("#bntGravar").click( function () {	
   			
   			if (!consistirPessoa(1)){
   				return;
   			}

   			$('#msg').html("");
   			
            var first = getUrlVars()["param1"];
            var link = "";
            var idPessoa = "";
            var idRelac = ""
            
            if ($('#txtLink').val() == "Null") {
                link = geraLink();
                idPessoa = "Null";
                idRelac = "Null";
			} else {
                link = $('#txtLink').val();	
                idPessoa = $("#txtId").val();
                //Recupera o id do relacionamento salvo na consulta               
                idRelac =  $("#txtIdRelac").val();
			}

			valEmpresa = parseFloat($('#txtempresa').val());
			tipoPessoa = $("#txtdocumento").attr("tipopessoa");

			//docSemMaskString = $("#txtdocumento").val().replace(/[^\d]+/g,'');
			docSemMaskString = $("#txtdocumento").val();
			
			//if (docSemMaskString == ""){
			//	docSemMaskString = "0"	;
			//}
			
		    //var docSemMask = parseFloat(docSemMaskString);
		    var docSemMask =  '"' + docSemMaskString  + '"';	
		    
			var nascimento = "";
			
			if ($('#txtnascimento').val() != ""){
				nascimento = ConvertddmmaaaaToaaaammdd($('#txtnascimento').val());				
			};


			//relacionamento
			relac = "[{";		
			if (idRelac != "Null") {  
				relac += '"id": ' + '"'  + idRelac + '",';
			}
			relac += '"id_empresa": ' + valEmpresa + '';
			relac += ',"lpessoa": ' + link + '';
			relac += ',"documento": ' + docSemMask + '';
			relac += ',"relacionamento": ' + '"' + $('#txtRelac').val() + '"';
			relac += ',"nomebusca": ' + '"'  + $('#txtnomebusca').val()  + '"';			
			relac += "}]";
	     
			//Tabela de Endereços inicio
			 var endereco = "[";
			  var json = $('#tableEndereco').tableToJSON();	
		  	  $.each(json, function(i, item) {
				     
		  		var end = JSON.stringify(json[i]);	  
		  	    var jsonParse = $.parseJSON(end); //convert string to obj
		  	    

		  	    if (jsonParse.ID != "***") {
			
		            if(i != 0){ endereco += ","};
					
		            endereco += "{";

	
		            if((jsonParse.ID != "") && (jsonParse.ID != "0")){endereco += '"id": ' + jsonParse.ID + ','};
	
		            endereco += '"id_empresa": ' + valEmpresa + '';
		            endereco += ',"lpessoa": ' + link + '';
		            endereco += ',"cep": ' + '"' +  jsonParse.Cep + '"';
		            endereco += ',"tipoendereco": '+ '"'  + jsonParse.Tipo + '"';
		            endereco += ',"logradouro": '+ '"' + jsonParse.Endereço + '"';       			
		            endereco += ',"bairro": ' + '"' + jsonParse.Bairro + '"';          	
		            endereco += ',"cidade": ' + '"' + jsonParse.Cidade + '"';  	            	
		            endereco += ',"estado": '+ '"' + jsonParse.UF + '"'; 
		           	  		
		            endereco += "}";		
		  	    };        
			  });  	
		  	  
			 endereco +=  "]";

		    //Tabela de Endereços fim

			 
		    //Tabela de Contatos inicio

		  	    
			 var contato = "[";
			  json = $('#tableContato').tableToJSON();				
		  	  $.each(json, function(i, item) {

		  		var cont = JSON.stringify(json[i]);	  
		  	    var jsonParse = $.parseJSON(cont); //convert string to obj
				
		  	    if (jsonParse.ID != "***") {
		  	    	if(i != 0){contato += ","};
					
		            contato += "{";	 
	
		            if(jsonParse.ID != "0"){contato += '"id": ' + jsonParse.ID + ','};
			
		            contato += '"id_empresa": ' + valEmpresa + '';
		            contato += ',"lpessoa": ' + link + '';
		            contato += ',"tipo": ' + '"' +  jsonParse.Tipo + '"';
		            contato += ',"nome": '+ '"'  + jsonParse.Nome + '"';
		            contato += ',"telefone1": '+ '"' + jsonParse.Telefone + '"';   
		            contato += ',"telefone2": '+ '"' + jsonParse.Nextel + '"'; 	            
		            contato += ',"celular1": ' + '"' + jsonParse.Celular1 + '"'; 
		            contato += ',"celular2": ' + '"' + jsonParse.Celular2 + '"';   	          
		            contato += ',"email1": ' + '"' + jsonParse.eMail1 + '"';  	            	
		            contato += ',"email2": '+ '"' + jsonParse.eMail2 + '"'; 	           	  		
		            contato += "}";		
		  	  };
			  });  	
			 contato +=  "]";
		    //Tabela de Contatos fim
			 
			dadosJson = "{ ";
			if (idPessoa != "Null") {  
				dadosJson += '"id": ' + '"'  + idPessoa + '",';
			}
			
   			dadosJson += '"id_empresa": ' + valEmpresa;

   			dadosJson += ',"tipopessoa": ' + '"'  + tipoPessoa + '"';
   			dadosJson += ',"documento": ' + docSemMask;

   			dadosJson += ',"nome": ' + '"'  + $('#txtnome').val()  + '"';
   			dadosJson += ',"nomebusca": ' + '"'  + $('#txtnomebusca').val()  + '"';   			
   			dadosJson += ',"nomefantasia": ' + '"'  + $('#txtnomeFantasia').val()  + '"';   
   			dadosJson += ',"rg": ' + '"' + $('#txtrg').val() + '"';

   			dadosJson += ',"cnh": ' + '"' + $('#txtcnh').val() + '"';

   			dadosJson += ',"nascimento": ' + '"' + nascimento + '"';
   			dadosJson += ',"relacionamento": ' + '"' + $('#txtRelac').val() + '"';
 
  			dadosJson += ',"link": ' + '"' + link + '"';
 
   			dadosJson += ',"endereco": ' + endereco ;	
   			dadosJson += ',"relac": ' + relac;	
   			dadosJson += ',"contato": ' + contato;	
   			
			dadosJson += " }";	
			
			
		     alert ("Json total ok  " +  dadosJson); 
			
   			var dadosJ = JSON.stringify(dadosJson);
            var obj1 = $.parseJSON(dadosJ); //convert string to obj

	   		var ambiente = getAmbiente();
	   	    arg = "";
	   		arg += ambiente;
	   	    arg += '/pessoa/rest/fisica/';
	   	    
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
  		             
 	   		  			getPessoaLink(link);
	   		  			getEnderecoLink(link);
	   		  			getContatoLink(link);
	   		  		    getRelacionamentoLink(link);
	   		  			
  		        	 $('#msg').html(response.msg);
  		        },
  		        error: function(e, msg) {
  		             $('#msg').html("***Erro - satus="  + e.status +  "---> " + e.statusText);
  		             $('#msg').css("color","##FF0000");

			    }			    
  		    }); 
  		     
  		});
   		
 		//Pesquisa por nome
   		$(document).on('click', '#btnPesquisarNome', function(){

   			var ambiente = getAmbiente();
   	   			
   			if ($("#txtPesqNome").val() == "")
   			   {alert("Preencha o campo")
   			   } else
   			 	{
	   	   			var idEmpresa = getUrlVars()["param1"];
	   	   		    idEmpresa = idEmpresa.replace('#', '');
	   	   			
	   	   		    arg = "";
	   	   		    arg += ambiente;
	   	   		    arg += '/pessoa/rest/relacionamento/nome/';
	   	   		    arg += idEmpresa;
	   	   		    arg += '/';
	   	   		    arg += $("#txtPesqNome").val();
	   	   		    
	   	   		    getRelacionamento(arg);

   				}	  				
			
  		});
  		
   		//Clicou btnEditar not pesquisar por nome/documento
  		$(document).on("click", "#btnSelecionarRelacionamento", function(){
  			
  			//salva o numero de link
 			var link = $(this).parent().parent().find(".col-xs-2").text();			
  			$("#txtLink").val(link);
  			
  			$('#btnPesqFechar').trigger('click');
  			
  			getPessoaLink(link);
  			getEnderecoLink(link);
  			getContatoLink(link);
  			getRelacionamentoLink(link);
  			
    	});
    		
  		//Incluir endereço na tabela da página principal
   		$(document).on('click', '#bntEndIcluir', function(){
   			
		    var newRow = $('<tr class="row" id="tableEndereco">');
   		    var cols = "";
   		    
   	        var currentrow = $(this).closest("tr").index();

   		    cols += '<td class="col-xs-1">';
   		    cols +=  $('#txtendId').val() ;
   		    cols += '</td>';
   		    cols += '<td class="col-xs-1">';
   		    cols +=  $("#cboEndTipo option:selected").text();   		
   		    cols += '</td>';
   		    cols += '<td class="col-xs-3">';
   		    cols += $('#txtendEndereco').val();
   		    cols += '</td>';
   		    cols += '<td class="col-xs-2">';
   		    cols += $('#txtendBairro').val() ;
   		    cols += '</td>';
   		    cols += '<td class="col-xs-1">';
   		    cols += $('#txtendCep').val();
   		    cols += '</td>';
   		    cols += '<td class="col-xs-2">';
   		    cols += $('#txtendCidade').val();
   		    cols += '</td>';
   		    cols += '<td class="col-xs-1">';
   		    cols += $('#txtendEstado').val();
   		    cols += '</td>';
   		    cols += '<td class="col-xs-1">';
   		    cols += '<button class="btn btn-success btn-xs" id="btnEditarEnd" type="submit" >Editar</button>';
   		    cols += '</td>';		

   		    newRow.append(cols);  	
   		    
   	       	$("#tableEndereco").append(newRow);	
   		
   		});

  		//Limpar o formulário 
   		$("#btnNovo").click( function () {
   			limparFormulario();
		   	$("#tbodyEndereco").empty();
		   	$("#tbodyContato").empty();		   	
	        $('#msg').html("Digite os dados para inclusão"); 
  		});
   		
 		//Incluir endereço na tabela de endereço  pelo modal
   		$(document).on('click', '#btnEndFechar', function(){

           var json = jQuery.parseJSON( $("#txtParam").val() );
           
           $('#txtendId').val(json.ID) ;

           $('#txtendTipo').val(json.Tipo) ;
           $('#txtendEndereco').val(json.Endereço) ;
           $('#txtendBairro').val(json.Bairro) ;
           $('#txtendCep').val(json.Cep) ;
           $('#txtendCidade').val(json.Cidade) ;
           $('#txtendEstado').val(json.UF) ;
	         
		    var newRow = $('<tr class="row" id="linhaTabela">');
   		    var cols = "";
   		    
   	        var currentrow = $(this).closest("tr").index();

   		    cols += '<td class="col-xs-1">';
   		    cols +=  $('#txtendId').val() ;
   		    cols += '</td>';
   		    cols += '<td class="col-xs-1">';
   		    cols +=  $("#cboEndTipo option:selected").text();   		
   		    cols += '</td>';
   		    cols += '<td class="col-xs-3">';
   		    cols += $('#txtendEndereco').val();
   		    cols += '</td>';
   		    cols += '<td class="col-xs-2">';
   		    cols += $('#txtendBairro').val() ;
   		    cols += '</td>';
   		    cols += '<td class="col-xs-1">';
   		    cols += $('#txtendCep').val();
   		    cols += '</td>';
   		    cols += '<td class="col-xs-2">';
   		    cols += $('#txtendCidade').val();
   		    cols += '</td>';
   		    cols += '<td class="col-xs-1">';
   		    cols += $('#txtendEstado').val();
   		    cols += '</td>';
   		    cols += '<td class="col-xs-1">';
   		    cols += '<button class="btn btn-success btn-xs" id="btnEditarEnd" type="submit" >Editar</button>';
   		    cols += '</td>';		

   		    newRow.append(cols);  	
   		    
   	       	$("#tableEndereco").append(newRow);	
   		
   		});

 		//Salvar dados anterior de contatos
   		$(document).on('click', '#btnContFechar', function(){

           var json = jQuery.parseJSON( $("#txtParam").val() );
           
           $('#txtcontId').val(json.ID) ;
           $('#txtcontTipo').val(json.Tipo) ;
           $('#txtcontNome').val(json.Nome) ;
           $('#txtcontTelefone').val(json.Telefone) ;
           $('#txtcontNextel').val(json.Nextel) ;
           $('#txtcontCelular1').val(json.Celular1) ;
           $('#txtcontCelular2').val(json.Celular2) ;
           $('#txtcontEmail1').val(json.eMail1) ; 	
           $('#txtcontEmail2').val(json.eMail2) ; 	

		    var newRow = $('<tr class="row" id="linhaTabela">');
		    var cols = "";
		    
		    cols += '<td class="col-xs-1">';
		    cols += $('#txtcontId').val();
		    cols += '</td>';
		    
		    cols += '<td class="col-xs-1">';
		    cols += $("#cboContTipo option:selected").text();
		    cols += '</td>';
		    
		    cols += '<td class="col-xs-2">';
		    cols += $('#txtcontNome').val();
		    cols += '</td>';

		    cols += '<td class="col-xs-1">';
		    cols += $('#txtcontTelefone').val();
		    cols += '</td>';

		    cols += '<td class="col-xs-1">';
		    cols += $('#txtcontNextel').val();
		    cols += '</td>';

		    cols += '<td class="col-xs-1">';
		    cols += $('#txtcontCelular1').val();
		    cols += '</td>';

		    cols += '<td class="col-xs-1">';
		    cols += $('#txtcontCelular2').val();
		    cols += '</td>';

		    cols += '<td class="col-xs-2">';
		    cols += $('#txtcontEmail1').val();
		    cols += '</td>';

		    cols += '<td class="col-xs-2">';
		    cols += $('#txtcontEmail2').val();
		    cols += '</td>';

		    cols += '<td class="col-xs-1">';
		    cols += '<button class="btn btn-success btn-xs" id="btnEditarContato">Editar</button>';
		    cols += '</td>';
		   
	   		newRow.append(cols);
	   		$("#tableContato").append(newRow);
  
   		});
   		
  		//Incluir dados do modal na tabela de contatos
   		$(document).on('click', '#bntContIncluir', function(){  
   		  
		    var newRow = $('<tr class="row" id="linhaTabela">');
		    var cols = "";
		
		    cols += '<td class="col-xs-1">';
		    cols += $('#txtcontId').val();
		    cols += '</td>';
		    
		    cols += '<td class="col-xs-1">';
		    cols += $("#cboContTipo option:selected").text();
		    cols += '</td>';
		    
		    cols += '<td class="col-xs-2">';
		    cols += $('#txtcontNome').val();
		    cols += '</td>';

		    cols += '<td class="col-xs-1">';
		    cols += $('#txtcontTelefone').val();
		    cols += '</td>';

		    cols += '<td class="col-xs-1">';
		    cols += $('#txtcontNextel').val();
		    cols += '</td>';

		    cols += '<td class="col-xs-1">';
		    cols += $('#txtcontCelular1').val();
		    cols += '</td>';

		    cols += '<td class="col-xs-1">';
		    cols += $('#txtcontCelular2').val();
		    cols += '</td>';

		    cols += '<td class="col-xs-2">';
		    cols += $('#txtcontEmail1').val();
		    cols += '</td>';

		    cols += '<td class="col-xs-2">';
		    cols += $('#txtcontEmail2').val();
		    cols += '</td>';

		    cols += '<td class="col-xs-1">';
		    cols += '<button class="btn btn-success btn-xs" id="btnEditarContato">Editar</button>';
		    cols += '</td>';
		   
	   		newRow.append(cols);
	   		$("#tableContato").append(newRow);
		    
   		});  		
  
   		$("#cboPessoa").change( function () {		
	  		$("#cboPessoa option:selected").each(function() {
	  			configurarPessoa($("#cboPessoa option:selected").text());
	  		}); 
  		});

   		$("#cboPessoaPesquisa").change( function () {		
	  		$("#cboPessoaPesquisa option:selected").each(function() {	  		
	  			if ($("#cboPessoaPesquisa option:selected").text() == "JURIDICA"){  				
	  				$("#txtPesqDocumento").attr("tipopessoa", "J");  
	  				$("#txtPesqDocumento").mask("00.000.000/0000-00");
	  				} else {
	  					   $("#txtPesqDocumento").attr("tipopessoa", "F");
	  				       $("#txtPesqDocumento").mask("000.000.000-00");	  				
	  				}	
	  		}); 
  		});
       
  //Lança o modal de manutenção de endereço pelo botão editar da tabela
  $(document).on("click", "#btnEditarEnd", function(){
	  
      var id = $(this).parent().parent().find(".col-xs-1").text();
 
      //linha corrente
		
      var row_index = $(this).closest("tr").index();
       
      i=0 ;
      var json = $('#tableEndereco').tableToJSON();
      
  	  $.each(json, function(i, item) {
  		   if (i == row_index) {
	          $('#txtParam').val(JSON.stringify(json[i]));
  		      $('#txtendItem').val(i);
	  	  	}   
	  });  	 
  
      var XX = $(this).closest("tr").remove();

     $('#myModal').modal('toggle');
  }); 

  //Lança o modal de manutenção de contatos.
  $(document).on("click", "#btnEditarContato", function(){
  
      //linha corrente
      var row_index = $(this).closest("tr").index();
       
      i=0 ;
      
      var json = $('#tableContato').tableToJSON();
  	  $.each(json, function(i, item) {
  		   if (i == row_index) {
	          //alert(JSON.stringify(json[i]));
	          $('#txtParam').val(JSON.stringify(json[i]));
	  	  	}   
	  });  	 
 
      var XX = $(this).closest("tr").remove();
      
     $('#ContatosModal').modal('show');
 });       
  
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
function carregarFormPessoa(jsonparam){
	
	var json = jsonparam[0];
 
	tipoPessoa = json.tipopessoa;
	
	if (tipoPessoa == "F"){
		   $("#txtdocumento").attr("tipopessoa", "F");
	       $("#txtdocumento").mask("00.000.000-00"); 
	       }
	       else {
	    		$("#txtdocumento").attr("tipopessoa", "J");  
	    		$("#txtdocumento").mask("00.000.000/0000-00");	    	   
	       };

	$('#txtdocumento').val(json.documento);

	var dtnascimento = "";
	
	if (json.nascimento != "") {
		dtnascimento = ConvertaaaammddToddmmaaaa(json.nascimento);
	};
	
	$("#txtnascimento").mask("00/00/0000");
	
	$("#txtnome").attr("idbd", json.id);
	$("#txtId").val(json.id);
	
	$('#txttipopessoa').val(json.tipopessoa);
	
	$('#txtnome').val(json.nome);
	$('#txtnomebusca').val(json.nomebusca);
	$('#txtnomeFantasia').val(json.nomefantasia);
	$('#txtnascimento').val(dtnascimento);
	$('#txtempresa').val(json.id_empresa);
	$('#txtrg').val(json.rg);
	$('#txtcnh').val(json.cnh);
	$('#txtRelac').val(json.relacionamento);
		
}  
function getRelacionamentoLink(link) {

	var first = getUrlVars()["param1"];
	var ambiente = getAmbiente();
	arg = "";
	arg += ambiente;
	arg += '/pessoa/rest/relacionamento/link/';
	arg += first;
	arg += '/';			
	arg += link;
    
    $.ajax({
      type: 'GET',
      url:  arg,
      dataType:'json',
        success:function(response){
        	carregarRelacionamentoLink(response);
        },
        error: function(e, msg) {
          console.log(e);
          console.log(msg); 
       }
    }); 
    	
}
function getContatoLink(link) {

	var first = getUrlVars()["param1"];
	var ambiente = getAmbiente();
	arg = "";
	arg += ambiente;
	arg += '/pessoa/rest/contato/link/';
	arg += first;
	arg += '/';			
	arg += link;
    
    $.ajax({
      type: 'GET',
      url:  arg,
      dataType:'json',
        success:function(response){
          carregarContatos(response);
        },
        error: function(e, msg) {
          console.log(e);
          console.log(msg); 
       }
    }); 
    	
}
function carregarContatos(json){

   	$("#tbodyContato").empty();		
   	
    if (json.length == 0 ){

      var newRow = $('<tr class="row">');
	  var cols = "";
	
	  cols += '<td class="col-xs-1">';
	  cols += '***';
	  cols += '</td>';
	  cols += '<td class="col-xs-2">';
	  cols += 'Não foram encontrados endereços cadastrados';
	  cols += '</td>';
	  cols += '<td class="col-xs-4"></td>';
	  cols += '<td class="col-xs-3">;</td>';
	  cols += '<td class="col-xs-2">';
	  cols += '';
	  cols += '</td>';
	
	  newRow.append(cols);
	  $("#tableContato").append(newRow);
    } else {

    	
    	  // alert("jason len --> " + json.length + " " + json[0]);
    	   
		   for (i=0; i < json.length ; i++) {
		
		    var newRow = $('<tr class="row" id="linhaTabela">');
		    var cols = "";
		
		   // alert("jason id --> " + json[i].id);
		    
		    cols += '<td class="col-xs-1">';
		    cols += json[i].id;
		    cols += '</td>';
		    cols += '<td class="col-xs-1">';
		    cols += json[i].tipo;
		    cols += '</td>';
		    cols += '<td class="col-xs-2">';
		    cols += json[i].nome;
		    cols += '</td>';
		    cols += '<td class="col-xs-1">';
		    cols += json[i].telefone1;
		    cols += '</td>';
		    cols += '<td class="col-xs-1">';
		    cols += json[i].telefone2;
		    cols += '</td>';
		    cols += '<td class="col-xs-1">';
		    cols += json[i].celular1;
		    cols += '</td>';

		    cols += '<td class="col-xs-1">';
		    cols += json[i].celular2;
		    cols += '</td>';

		    cols += '<td class="col-xs-2">';
		    cols += json[i].email1;
		    cols += '</td>';

		    cols += '<td class="col-xs-2">';
		    cols += json[i].email2;
		    cols += '</td>';
		    
		    cols += '<td class="col-xs-1">';
		    cols += '<button class="btn btn-success btn-xs" id="btnEditarContato">Editar</button>';
		    cols += '</td>';
		   
		    newRow.append(cols);
		    $("#tableContato").append(newRow);
          }
        }      
}

function getEnderecos(Param) {

	var ambiente = getAmbiente();
    arg = "";
    arg += ambiente;
    arg += '/pessoa/rest/endereco/';
    arg += Param;
    $.ajax({
      type: 'GET',
      url:  arg,
      dataType:'json',
        success:function(response){
          carregarEndereco(response);
        },
        error: function(e, msg) {
          console.log(e);
          console.log(msg); 
       }
    }); 
    	
}
function carregarEndereco(json){

   	$("#tbodyEndereco").empty();
	   	
    if (json.length == 0 ){

      var newRow = $('<tr class="row">');
	  var cols = "";
	
	  cols += '<td class="col-xs-1">';
	  cols += '***';
	  cols += '</td>';
	  cols += '<td class="col-xs-2">';
	  cols += 'Não foram encontrados endereços cadastrados';
	  cols += '</td>';
	  cols += '<td class="col-xs-4"></td>';
	  cols += '<td class="col-xs-3">;</td>';
	  cols += '<td class="col-xs-2">';
	  cols += '';
	  cols += '</td>';
	
	  newRow.append(cols);
	  $("#tableEndereco").append(newRow);
    } else {

  for (i=0; i < json.length ; i++) {

    var newRow = $('<tr class="row" id="linhaTabela">');
    var cols = "";

    cols += '<td class="col-xs-1">';
    cols += json[i].id;
    cols += '</td>';
    cols += '<td class="col-xs-1">';
    cols += json[i].tipoendereco;
    cols += '</td>';
    cols += '<td class="col-xs-3">';
    cols += json[i].logradouro;
    cols += '</td>';
    cols += '<td class="col-xs-2">';
    cols += json[i].bairro;
    cols += '</td>';
    cols += '<td class="col-xs-1">';
    cols += json[i].cep;
    cols += '</td>';
    cols += '<td class="col-xs-2">';
    cols += json[i].cidade;
    cols += '</td>';
    cols += '<td class="col-xs-1">';
    cols += json[i].estado;
    cols += '</td>';
    cols += '<td class="col-xs-1">';
    cols += '<button class="btn btn-success btn-xs" id="btnEditarEnd" type="submit" >Editar</button>';
    cols += '</td>';
   
    newRow.append(cols);
    $("#tableEndereco").append(newRow);
          }
        }     
 
}

function getEnderecoLink(link){

	var first = getUrlVars()["param1"];
	var ambiente = getAmbiente();
	arg = "";
	arg += ambiente;
	arg += '/pessoa/rest/Endereco/link/';
	arg += first;
	arg += '/';			
	arg += link;
	
	$.ajax({
	    	type: 'GET',
	    	url: arg,
	    	dataType:'json',
	        success:function(response){
	        	carregarEndereco(response)
	        },
	       	error: function(e, msg) {
	 	       	console.log(e);
	   		    console.log(msg);	
	    }
	}); 
 }

function getPessoaLink(link){

	var first = getUrlVars()["param1"];
		var ambiente = getAmbiente();
	    arg = "";
		arg += ambiente;
	    arg += '/pessoa/rest/fisica/link/';
	arg += first;
	arg += '/';			
	arg += link;
	
	$.ajax({
	    	type: 'GET',
	    	url: arg,
	    	dataType:'json',
	        success:function(response){
	         	carregarFormPessoa(response)
	        },
	       	error: function(e, msg) {
	 	       	console.log(e);
	   		    console.log(msg);	
	    }
	}); 
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

		    //Limpa tabela antes de carregar
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
            cols += json[i].id;
            cols += '</td>';
            cols += '<td class="col-xs-2">';
            cols += json[i].lpessoa;
            cols += '</td>';            
            cols += '<td class="col-xs-6">';
            cols += json[i].nomebusca;
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
	
	function carregarRelacionamentoLink(json) {

     for (i=0; i < json.length ; i++) {
			$("#txtIdRelac").val(json[i].id);	

	    }
	}
	
	function configurarPessoa(pessoa){
		switch (pessoa) {
		  case "FISICA":			  
				$("#nomefantasia").attr("class","hide");
			    $("#nome").html("Nome");
     		    $("#cnh").html("CNH");
				$("#nascimento").html("Nascimento");
				$("#rg").html("RG");
	  			$("#documento").html("CPF");				
	  			$("#txtdocumento").attr("tipopessoa", "F");
	 			$("#txtdocumento").mask("000.000.000-00");
				break;
		  default:
				$("#nomefantasia").attr("class","col-xs-2");			  
				$("#nome").html("Razão Social");
			    $("#cnh").html("Inscrição Municipal");
				$("#nascimento").html("Fundação");
				$("#rg").html("Inscrição Estadual");
	  			$("#documento").html("CNPJ");					
	 			$("#txtdocumento").attr("tipopessoa", "J");
	 			$("#txtdocumento").mask("00.000.000/0000-00");
				break;
			}		
	}
	function limparFormulario(){
		$('#frmcadastro').each (function(){
   			  this.reset();
   			});
			$("#txtempresa").val(getUrlVars()["param1"]);
            $('#cboPessoa').focus(); 
			$("#txtLink").val("Null");

  };
	function consistirPessoa(num){

		if ($('#txtnomebusca').val() == "") {
			alert("Nome de Pesquisa não informado");
			$('#txtnomebusca').focus();
			return false;
		};	
	
		if ($('#txtdocumento').val() != "" && $('#txtdocumento').val() != "0") {	
			//alert("Entrou consiste documento " + $('#txtdocumento').val());
	       if (!consisteCNPJ_CPF($("#cboPessoa option:selected").text(),$('#txtdocumento').val())){
	    	   $('#txtdocumento').focus();   
	    	   return false;
	       };
		};	

		if ($('#txtnascimento').val() != "") {		
			   if($('#txtnascimento').val().length < 10) {
					alert("Data inválida" + $('#txtnascimento').length);		    	   
			    	   $('#txtnascimento').focus();   
			    	   return false;				   
			   };
		       if (!isDate($('#txtnascimento').val())){
					alert("Data inválida");		    	   
		    	   $('#txtnascimento').focus();   
		    	   return false;
		       };
		};	
	    return true;
	};
	
	function consisteCNPJ_CPF(pessoa,numero) {

		switch (pessoa) {
		  case "FISICA":	
				if(numero == ""){
					alert("CPF não informado!");	
					return false;
				};
				if(numero.length < 11){
					alert("CPF invalido!");					
					return false;
				};				  
			   if (!modulo11CPF(numero)) {
	       	          alert("Digito CPF inválido");					  
				      return false;
				   };
			    return true;				   
				break;
		  default:
				if(numero == ""){
					alert("CNPJ não informado!");	
					return false
				};
				if(numero.length < 14){
					alert("CNPJ invalido!");					
					return false;
				}			  
			   if (!modulo11CNPJ(numero)) {
	       	      alert("Digito CNPJ inválido");					   
				  return false;
			   }
			   return true;
			   break;
			}				
	}

	function modulo11CNPJ(num){
		
	    //num = $("#txtPesqDocumento").val().replace(/[^\d]+/g,'');
	    num = num.replace(/[^\d]+/g,'');
	    
		var base = 2;		
		var fator = 9;		
		var digito;
		var resto;
		var numeros = new Array();
		var parcial = new Array();
		var soma = 0;
		var tam =0;	
		var siz =0;
		var dv1=0;
		var dv_sv = 0;
		
		/*
		if(num == ""){
			alert("CNPJ não informado!");	
			return false
		};
		if(num.length < 14){
			alert("CNPJ invalido!");					
			return false;
		}
		*/
		
		siz = num.substr(0,6);
	            //valida se o dominio/protoco eh valido
		/*
		if(siz != '829526'){
			alert("Nosso Numero proto invalido!");
			limpaCampos("formBaixa");
			return false;
		}	
		*/	
		//recebe apenas os 12 primeiros digitos para primeiro cálculo
		tam = num.substr(0,12);	
		/*separação dos números*/
		for(i=tam.length;i>0;i--){		    
			numeros[i]=tam.substr(i-1,1); //pega cada número isoladamente			
			parcial[i]=numeros[i]*fator; //Efetua a multiplicação do número pelo fator
			
			//alert("numeros " + numeros[i]  + " " + fator);
			
			soma += parcial[i]; //soma dos digitos
			if(fator==base)fator=10; //restaura o fator de multiplicação para 2
			fator --;			 
		}		
		/*Calculo do módulo11*/
		resto = soma % 11;		
		if (resto < 10){ 
			dv = resto; 
			dv_sv = dv * 10
		}else if(resto == 10){ 
			dv = 'x'; 
		}	
		
		//recebe apenas os 13 primeiros digitos para segundo cálculo
		tam = num.substr(0,13);	
		soma =0;
		fator = 9;	
		/*separação dos números*/
		for(i=tam.length;i>0;i--){		    
			numeros[i]=tam.substr(i-1,1); //pega cada número isoladamente			
			parcial[i]=numeros[i]*fator; //Efetua a multiplicação do número pelo fator
			
			//alert("numeros " + numeros[i]  + " " + fator);
			
			soma += parcial[i]; //soma dos digitos
			if(fator==base)fator=10; //restaura o fator de multiplicação para 2
			fator --;			 
		}		
		/*Calculo do módulo11*/
		
		//alert("soma " + soma);
		resto = soma % 11;		
		if (resto < 10){ 
			dv = resto; 
			dv_sv = dv_sv + dv
		}else if(resto == 10){ 
			dv = 'x'; 
		}				
		
		
		//verifica se o digito verificador eh o mesmo calculado pelo módulo11
		dv1 = num.substr(12,14);
		//alert("dv_sv " + dv_sv + " dv1 " + dv1);
		if(dv_sv != dv1){
			//alert("Digito CNPJ invalido!");
			return false;
		}		
		return true;
	}
	    //function limpaCampos(frm){		
		//document.forms[frm].reset();
	    //}

	function modulo11CPF(num){
		
	    num = num.replace(/[^\d]+/g,'');
	    	
		var fator = 2;		
		var digito;
		var resto;
		var numeros = new Array();
		var parcial = new Array();
		var soma = 0;
		var tam =0;	
		var siz =0;
		var dv1=0;
		var dv_sv = 0;
		
		//recebe apenas os 9 primeiros digitos para primeiro cálculo
		tam = num.substr(0,9);	
		/*separação dos números*/
		for(i=tam.length;i>0;i--){		    
			numeros[i]=tam.substr(i-1,1); //pega cada número isoladamente			
			parcial[i]=numeros[i]*fator; //Efetua a multiplicação do número pelo fator
			soma += parcial[i]; //soma dos digitos
			fator ++;			 
		}		
		/*Calculo do módulo11*/
		resto = soma % 11;		
		if (resto < 2){ 
			dv =0
			dv_sv = dv;
		}else { 			
			dv = 11 - resto; 
			dv_sv = dv * 10;
		}	
		
		//recebe apenas os 10 primeiros digitos para segundo cálculo
		tam = num.substr(0,10);	
		fator = 2;	
		soma =0;
		/*separação dos números*/
		for(i=tam.length;i>0;i--){		    
			numeros[i]=tam.substr(i-1,1); //pega cada número isoladamente			
			parcial[i]=numeros[i]*fator; //Efetua a multiplicação do número pelo fator
			soma += parcial[i]; //soma dos digitos
			fator ++;			 
		}			
		/*Calculo do módulo11*/
		resto = soma % 11;		
		if (resto < 2){ 
			dv =0
		}else { 			
			dv = 11 - resto;
		}				
		
		dv_sv = dv_sv + dv;
		//verifica se o digito verificador eh o mesmo calculado pelo módulo11
		dv1 = num.substr(9,2);
		//alert("dv_sv " + dv_sv + " dv1 " + dv1);
		if(dv_sv != dv1){
			return false;
		}		
		return true;
	}

	function isDate(txtDate)
	{

		var txtDate2 = ''; 
		txtDate2 += txtDate.substring(3, 5);
		txtDate2 += '/';
		txtDate2 += txtDate.substring(0, 2);
		txtDate2 += '/';
		txtDate2 += txtDate.substring(6, 10);
	    
		//alert("dataReturn " + dataReturn);
		
	  var currVal = txtDate2;
	  if(currVal == '')
	    return false;
	   
	  //Declare Regex 
	  var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
	  var dtArray = currVal.match(rxDatePattern); // is format OK?
	 
	  if (dtArray == null)
	     return false;
	  
	  //Checks for mm/dd/yyyy format.
	  dtMonth = dtArray[1];
	  dtDay= dtArray[3];
	  dtYear = dtArray[5];
	 
	  if (dtMonth < 1 || dtMonth > 12)
	      return false;
	  else if (dtDay < 1 || dtDay> 31)
	      return false;
	  else if ((dtMonth==4 || dtMonth==6 || dtMonth==9 || dtMonth==11) && dtDay ==31)
	      return false;
	  else if (dtMonth == 2)
	  {
	     var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
	     if (dtDay> 29 || (dtDay ==29 && !isleap))
	          return false;
	  }
	  return true;
	}
