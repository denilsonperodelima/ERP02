$(document).ready(function(){
	$('#frmfuncionariocadastro').bind('submit',function(e){
		e.preventDefault();
	});
	lancawait();
});

window.onload = function(e) {
	e.preventDefault(); 
	  
  	$('#emp').html(sessionStorage.getItem("nome"));
	$('#novo').trigger('click'); 
	$('#novo').attr('disabled',true); 
	
	//funcionariocadastrocon("/usuario/perfis" , "consultarperfis")  
	
	funcionariocadastrocon("/grupo/" + sessionStorage.getItem("id") +  "/"  + $("#tiporelacionamento").val(), "carregarcombos")  			
	carregarperiodotrabalhosemrestricao();
	$("#modalrelac").html($("#tiporelacionamento").val());
	
    swal.close();
}


$("#pesquisarfunc").click( function (e) {
	e.preventDefault();
    $('#modalpessoaconsultanome').modal('toggle');
});  


//botao selecionar do modal
$(document).on("click", "#selecionarpessoaitem", function(e){	
	e.preventDefault();
	
	$("#idpessoa").val($(this).parent().parent().find("#idmodal").text()); 	
	$("#nome").val($(this).parent().parent().find("#nomemodal").text()); 
	$("#cpfoucnpj").val($(this).parent().parent().find("#documentomodal").text());       			
	
	$('#pessoaconsultanomefechar').trigger('click'); //fechou modal

	funcionariocadastrocon("/funcionario/"  + $("#idpessoa").val(), "consultarfuncionarioid")     			
});
    				
 
$("#gravarfuncionario").click( function (e) {
	    e.preventDefault();
	    $('#msg').html("");
	    
	    if (consisteForm() == false) {
	       return;	
	    };

	    definirusuariostrilha(); //definir usuario de inclusao e.ou alteracao
	    
	    var json = getformulario();	
	    
		//alert("json " + json)		
	    //console.log(json);

	    funcionariocadastrogrv("/pessoa", json, "gravarfuncionario")	
					    		    
});	
   		
$("#limparsuspenso").click( function (e) {
	e.preventDefault();
	$('#periodosuspenso .row .form-control').each (function(){
		$(this).val("");
		});   								    		    
});   		
$("#limpareventual").click( function (e) {
	e.preventDefault();
	$('#periodoeventual .row .form-control').each (function(){
		$(this).val("");
		});   								    		    
});  		

$("#novo").click( function (e) {
	e.preventDefault();
	limparformulario($('#frmfuncionariocadastro')); // esta em util
	resetarperfil();
	carregarperiodotrabalhosemrestricao();
	iniciarformulario(); 		    
});	   		
  
$(document).on("keyup", function(e) { 
	e.preventDefault();
	if ( e.altKey && ( e.which == 78 ) ) { //ALT + N
	   $('#novoxxx').trigger('click');
	}
	if ( e.altKey && ( e.which == 79 ) ) { //ALT + O
		   $('#novocontato').trigger('click');
		}	
	if ( e.altKey && ( e.which == 80 ) ) { // ALT + P
	   $('#pesquisarfunc').trigger('click');
	   //activateTab("periodosuspenso")	
	}   			
});

function consisteForm() {

	if ($("#cpfoucnpj").val() != "") {
		if (consisteCNPJ_CPF("FISICA",$("#cpfoucnpj").val())){ 
		} else {
	        $("#cpfoucnpj").focus();
			return false;}
	}
	
	if ($("#nome").val() == "") {
	    alert("Nome inválido"); 	
        $("#nome").focus();
		return false;
	}      			   			
}
$("#semrestricaohorario").click( function (e) {
	e.preventDefault();
	carregarperiodotrabalhosemrestricao()					    		    
});   iniciarformulario


$("#comrestricaohorario").click( function (e) {
	e.preventDefault();
	carregarperiodotrabalhodefault()					    		    
});   
   		
function carregarfuncionario(json){

	 iniciarformulario();
	
	 $('#idpessoa').val(json.id);
	 $('#cpfoucnpj').val(json.documento).mask("000.000.000-00");
	 $('#nome').val(json.nome);

	carregartrilhaEmontarlinhatexto(json);
		
	$.each(json, function(key, value) {
	  carregarform($("#cadastro :input"), key, value);
   	});

    $.each(json.usuarios, function(i, item) {
		$.each(item, function(key, value) {
			  carregarform($("#permissoes :input"), key, value);
		});
	});
	
    $.each(json.enderecos, function(i, item) {
	  	  $('#linhaendereco #idendereco').val(item.id);  
		  $('#linhaendereco #tipoendereco option:selected').text(item.tipo);	
	  	  $('#linhaendereco #logradouro').val(item.logradouro);  
	  	  $('#linhaendereco #bairro').val(item.bairro);  
	  	  $('#linhaendereco #cep').val(item.cep);  
	  	  $('#linhaendereco #cidade').val(item.cidade);  
	  	  $('#linhaendereco #uf').val(item.uf);

		  adicionarlinhaendereco();
	 }); 

    $.each(json.bancos, function(i, item) {
	  	  $('#linhabanco #idbanco').val(item.id);  
	  	  $('#linhabanco #codigobanco').val(item.codigo);  
	  	  $('#linhabanco #nomebanco').val(item.nome);  
	  	  $('#linhabanco #contabanco').val(item.conta);  
	  	  $('#linhabanco #obsbanco').val(item.obs);  

		  adicionarlinhabanco();
	 }); 
	
    carregarcontatos(json); //contatocontrole
	 
	carregarperiodotrabalho(json.usuarioperiodosdetrabalho);
		
	$.each(json.usuarioperiodoeventual, function(i, jsoneventual) {
		$('#idperiodoeventual').val(jsoneventual.id);
		$('#datainicioeve').val(jsoneventual.Datainicio).mask("00/00/0000");
		$('#datafimeve').val(jsoneventual.Datafim).mask("00/00/0000");;   			
		$('#horainicioeve').val(jsoneventual.horainicio).mask("00")
		$('#horafimeve').val(jsoneventual.horafim).mask("00");   				
   	});
 
 	$.each(json.usuarioperiodosuspenso, function(i, jsonsuspenso) {
	   	$('#idperiodosuspenso').val(jsonsuspenso.id);
		$('#datainiciosus').val(jsonsuspenso.Datainicio).mask("00/00/0000");
		$('#datafimsus').val(jsonsuspenso.Datafim).mask("00/00/0000");   			
		$('#horainiciosus').val(jsonsuspenso.horainicio).mask("00");
		$('#horafimsus').val(jsonsuspenso.horafim).mask("00");  ;   				
    });
	
	resetarperfil();
    $.each(json.usuarios, function(i, item) {
	    $.each(item.perfis, function(i, nome) {
	     $('.lipermissoes #divperfil').each(function(index, element) {
	    	  if($(this).children('#perfilnome').html() == nome ){      
	    		  $(this).children().children().children('span').removeClass("glyphicon glyphicon-remove").addClass("glyphicon glyphicon-ok")  
	    	  }
	     })   				
	    });   				
    });
	  
   }

function resetarperfil() {
     $('.liperfil #divperfil').each(function(index, element) { 
    	if ($(this).children().children().children('span').attr('class').indexOf("glyphicon-ok") >= 0){
    		 $(this).children().children().children('span').removeClass("glyphicon glyphicon-ok").addClass("glyphicon glyphicon-remove") 
    	} 
        
     });   			   			
}
function carregarperfis(json){

	var listitems = ""
    for (i=0; i < json.length ; i++) {
		
		listitems += '<div class="row" id="divperfil">'
  		listitems += '<div class="hidden">' + json[i][0] + '</div>'	
  		listitems += '<div class="col-xs-1" id="perfilnome">' + json[i][1] + '</div>'			  		
  	    listitems += '<div class="col-xs-3" style="margin-left: +8%">'  
  		listitems += '<button class="button"id="botaoperfil" style="border-radius: 50%;background-color: #f9f9f9;margin-top: 0%;" disabled>'
  		listitems += '<span class="glyphicon glyphicon-remove"></span>'
  	    listitems += '</button>      </div>'	  			
  		listitems += '</div>'	  			 
    }

   $('.lipermissoes').append(listitems);
    
};

function iniciarformulario(){
    
    $('#idpessoa').val("null");
    $('#idendereco').val("null");  
    $('#idcontato').val("null");
    $('#idcontatoitens').val("null");
    $('#idbanco').val("null");
    
    $('#idsegunda').val("null");
    $('#idterca').val("null");
    $('#idquarta').val("null");
    $('#idquinta').val("null");
    $('#idsexta').val("null");
    $('#idsabado').val("null");
    $('#iddomingo').val("null");
 
    $('#idperiodoeventual').val("null");
    $('#idperiodosuspenso').val("null");  
    
    $('#idusuario').val("null");     
    
	$("#tiporelacionamento").val("FUNCIONARIO");
	$("#cpfoucnpj").mask("000.000.000-00");
	$("#nascimentodata").mask("00/00/0000");
	
	$('#msg').html("");	

	
    $('.luendereco #lienderecodinamico').each(function(index, element) {
	   element.remove();
	});
    
    $('.ulcontato #licontatodinamico').each(function(index, element) {
	   element.remove();
	});

    $('.ulcontatoitens #licontatoitensdinamico').each(function(index, element) {
		   element.remove();
   	});
  
    $('.lubanco #libancodinamico').each(function(index, element) {
		   element.remove();
	});

    limparperfil();
	
    $('#cpfoucnpj').focus();   		
} 
function limparperfil(){			  
     $('.ulpermissoes .lipermissoes .row').each(function(index, element) {
		 	   element.remove();
	     });
  }; 

function sonumeros( string )	{
		var novastring = string.replace(/[\.-]/g, "");
	return novastring;
}