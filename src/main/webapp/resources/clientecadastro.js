$(document).ready(function(){
	$('#clientecadastro').bind('submit',function(e){
		e.preventDefault();
	});
});
   		
window.onload = function() {  
  	
  	  $('#emp').html(sessionStorage.getItem("nome"));
  	  
	  iniciarpagina();
	  
  	  $('#emp').html(sessionStorage.getItem("nome"));
	  operacaoGET("/grupo/" + sessionStorage.getItem("id") + "/"  + $("#tiporelacionamento").val(), "carregarcombos")
	  
}  	//document load close;	

$("#pesquisarcliente").click( function (e) {
		e.preventDefault();
		$("#modalrelac").html($("#tiporelacionamento").val());
        $('#modalpessoaconsultanome').modal('toggle');
});  

$(document).on("click", "#selecionarpessoaitem", function(e){	
		e.preventDefault();
		
		$("#id").val($(this).parent().parent().find(".col-xs-1").text()); 	
		$("#nome").val($(this).parent().parent().find(".col-xs-6").text()); 	
		$('#pessoaconsultanomefechar').trigger('click'); 
		
		var url = getAmbiente() + "/cliente/"  + $("#id").val() 

		consultarCliente(url)
		
});

$(document).on("keyup", function(e) { 
	e.preventDefault();
	if ( e.altKey && ( e.which == 78 ) ) { //ALT + N
	   $('#novo').trigger('click');
	}
	if ( e.altKey && ( e.which == 79 ) ) { //ALT + O
		   $('#novocontato').trigger('click');
		}	
	if ( e.altKey && ( e.which == 80 ) ) { // ALT + P
	   $('#pesquisarcliente').trigger('click');
	   //activateTab("periodosuspenso")	
	}   			
});
     		
$("#gravarclientecadastro").click( function (e) {
	e.preventDefault();
	     		
    if (consistirFormulario() == false) {
	       return;	
	};    
	
    definirusuariostrilha(); //definir usuario de inclusao e.ou alteracao
    
	var cadastro = serializeForm($("#cadastro :input"),true)
    cadastro = cadastro.replace("[","").replace("]","");
	cadastro += ',"id": ' + '"' + $('#id').val() + '"';
	cadastro += ',"tipopessoa": ' + '"' +  $('#tipopessoa').val() + '"';     		
	cadastro += ',"documento": ' + '"' +  $('#documento').val() + '"';  
	cadastro += ',"nome": ' + '"' +  $('#nome').val() + '"'; 
	
	var empresa =  ',"' + 'empresa' +'"' + ":" ; 
	empresa +=getEmpresa()
	
	var bancos =  ',"' + 'bancos' +'"' + ":[" ; 
	bancos += serializeFormOccurs($("#banco :input"),6)
	bancos += "]" 
		
	var enderecos =  ',"' + 'enderecos' +'"' + ":[" ; 
	enderecos += serializeFormOccurs($("#endereço :input"),8)
	enderecos += "]"     
		
    var contatos = gerajson() //contatocontrole      		    	

	json  = "{" + '"' + '@type":"cliente' +'",';	
	json += cadastro;	
	json += empresa;
	json += enderecos;	
	json += contatos;	
	json += bancos;		
	json += "}";

	gravarclinte(json);
	
 }); 
        
$("#novo").click( function (e) {
	e.preventDefault();
	iniciarpagina();
    $('#tipopessoa').val("JURIDICA").change();		    
    configurarPessoa("JURIDICA");	    
    $('#tipopessoa').focus();
 });
        
$("#tipopessoa").change( function () {		
	$("#tipopessoa option:selected").each(function() {
		configurarPessoa($("#tipopessoa option:selected").text());
	}); 
});
     
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
		  case "JURIDICA":	
		    	$("#nmfanta").html("Nome Fantasia");;	  
				$("#nome").html("Razão Social");
			    $("#cnh").html("Inscrição Municipal");
				$("#rg").html("Inscrição Estadual");
	  			$("#lbldocumento").html("CNPJ");					
	 			$("#documento").mask("00.000.000/0000-00");
				break;
		    default: 
				$("#nome").html("Nome");
	        	$("#nmfanta").html("Documento 1");;	 		    
			    $("#cnh").html("Documento 2");
				$("#rg").html("Documento 3");
	  			$("#lbldocumento").html("OUTRO");		    	
		    	$('#documento').unmask();	 
		    	break;				
			}		
	}  

function iniciarpagina(){
   	   
    limparFormulario() 
    
    $('#id').val("null");
	$("#cepnf").mask("00000-000");
	$("#cep").mask("00000-000");
	$("#tiporelacionamento").val("CLIENTE");
	
	$('#msg').html("");	

    $('.luendereco #lienderecodinamico').each(function(index, element) {
 	   element.remove();
 	});
     
     $('.ulcontatodinamico #licontatodinamico').each(function(index, element) {
 	   element.remove();
 	});
   
     $('.lubanco #libancodinamico').each(function(index, element) {
 		   element.remove();
 	});
  		
} 
	function limparFormulario(){
			$('#clientecadastro').each (function(){
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
	
	function carregarcliente(json){
			
		iniciarpagina();
		
		//alert("json " + JSON.stringify(json))
	    
		$('#id').val(json.id); 
		$('#tipopessoa').val(json.tipopessoa).change();	

		$('#nome').val(json.nome);  
		$('#documento').val(json.documento); 		
		$('#nomefantasia').val(json.nomefantasia);  			
		$('#inscestadual').val(json.inscestadual);  	
		$('#inscmunicipal').val(json.inscmunicipal);  	
		$('#endereconf').val(json.endereconf);  	
		$('#cepnf').val(json.cepnf);  	
		$('#bairronf').val(json.bairronf);  	
		$('#cidadenf').val(json.cidadenf);  	
		$('#ufnf').val(json.ufnf);  	
		$('#tiporelacionamento').val(json.tiporelacionamento);  	
		
		carregartrilhaEmontarlinhatexto(json);

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

	    carregarcontatos(json); //contatocontrole	  
	    
	    $.each(json.bancos, function(i, item) {
		  	  $('#linhabanco #idbanco').val(item.id);  
		  	  $('#linhabanco #codigobanco').val(item.codigo);  
		  	  $('#linhabanco #nomebanco').val(item.nome);  
		  	  $('#linhabanco #contabanco').val(item.conta);  
		  	  $('#linhabanco #obsbanco').val(item.obs);  

			  adicionarlinhabanco();
		 }); 
	}		


	
