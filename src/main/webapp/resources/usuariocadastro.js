$(document).ready(function(){
	$('#frmusuariocadastro').bind('submit',function(e){
		e.preventDefault();
	});
});

window.onload = function(e) {
	e.preventDefault(); 
 
  	$('#emp').html(sessionStorage.getItem("nome"));
	$('#btnNovo').trigger('click'); 
	usuariocadastrocon("/usuario/perfis" , "consultarperfis")      			
}

$("#bntGravar").click( function (e) {
    $('#msg').html("");
    
    if (consisteForm() == false) {
       return;	
    };    

	if ($('#idusuario').val() == "null") {
	    var json = getformulario();	
	    //console.log(json);
		usuariocadastrogrv("/pessoa/inclusaousuario", json, "incluirusuario")				
	} else {
		var json = getformulariousuario();
		usuariocadastrogrv("/usuario", json, "gravarusuario")
       }					    		    
});	

$("#pesquisarfunc").click( function (e) {
	e.preventDefault();
	$("#modaltipopessoa").val("FISICA").change();	
	$("#modalrelac").html("USUÁRIO");
    $('#modalusuarioconsultanome').modal('toggle');
});  


//botao selecionar do modal
$(document).on("click", "#selecionarusuario", function(e){	
	e.preventDefault();
	
	$("#idusuario").val($(this).parent().parent().find("#idmodal").text()); 	
	$("#nome").val($(this).parent().parent().find("#nomemodal").text()); 
	$("#cpfoucnpj").val($(this).parent().parent().find("#documentomodal").text());       			
	
	$('#usuarioconsultanomefechar').trigger('click'); //fechou modal

	usuariocadastrocon("/usuario/"  + $("#idusuario").val(), "consultarusuarioid")     			
});
  	    
  		

$(document).on("click", "#botaoperfil", function(e){
	e.preventDefault(); 

	switch($(this).children('span').attr('class')) {
	    case "glyphicon glyphicon-ok":  
	        $(this).children('span').removeClass("glyphicon glyphicon-ok").addClass("glyphicon glyphicon-remove")   		    	
	    	break;	
	    case "glyphicon glyphicon-remove": 	   		    	
	        $(this).children('span').removeClass("glyphicon glyphicon-remove").addClass("glyphicon glyphicon-ok")
		    	break;	 		    	
		    default:
			}
  });   	 
   		  		
$("#btnNovo").click( function (e) {
	e.preventDefault();
	limparFormulario(); // criar funcao em util
	resetarPerfil();
	$('#cpfoucnpj').val("").mask("000.000.000-00"); 
	$('#dataexpira').val("").mask("00/00/0000");
	$("#email").attr("disabled", false);	
	$("#idusuario").val("null"); 	
	$('#tipo').val("1");
    $('#msg').html("");    
    $("#nome").focus();
});	   		

$("#marcartodosperfis").click( function (e) {
	e.preventDefault();
	marcartodosperfis()	
});

$(document).on("keyup", function(e) { 
	
	if ( e.altKey && ( e.which == 78 ) ) { //ALT + N
	   $('#btnNovo').trigger('click');
	}
	if ( e.altKey && ( e.which == 80 ) ) { // ALT + P
		   $('#pesquisarfunc').trigger('click');
		   //activateTab("periodosuspenso")	
		}   			
});
   		

function consisteForm() {

	if ($("#email").val() == "") {
	    alert("E-mail inválido"); 	
        $("#email").focus();
		return false;
	}

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
	
	var sumok = 0;
    $('.liperfil #divperfil').each(function(index, element) { 
    	if ($(this).children().children().children('span').attr('class').indexOf("glyphicon-ok") >= 0){
    		sumok = sumok + 1;	
    	} 			        
	});   			

	if (sumok == 0) {
	    alert("Escolha ao menos um perfil de acesso"); 	
		return false;
	}     			   			
}



function atualizarUsuarioLista(json){

	//alert("json" + JSON.stringify(json));
	
    $.each(json, function(i, item) {
    	atualizarUsuario(item)		
     });
    
}
function atualizarUsuario(json){
	
	$("#email").attr("disabled", true);
	$("#email").val(json.email);
    $("#cpfoucnpj").focus();
    
	$('#idusuario').val(json.id); 
	$('#nome').val(json.nome);  
	$('#cpfoucnpj').val(json.cpfOuCnpj).mask("000.000.000-00"); 			
	$('#tipo').val("1");
	$("#status").val(json.status).change();
	$('#dataexpira').val(json.dataexpira).mask("00/00/0000");
	
	// perfil------------------------ --------------------------------------
		
	 resetarPerfil();
     $.each(json.usuarios, function(i, item) {
	    $.each(item.perfis, function(i, nome) {
	     $('.liperfil #divperfil').each(function(index, element) {
	    	  if($(this).children('#perfilnome').html() == nome ){      
	    		  $(this).children().children().children('span').removeClass("glyphicon glyphicon-remove").addClass("glyphicon glyphicon-ok")  
	    	  }
	     })   				
	    });   				
     });
	    	  
   }

function resetarPerfil() {
     $('.liperfil #divperfil').each(function(index, element) { 
    	if ($(this).children().children().children('span').attr('class').indexOf("glyphicon-ok") >= 0){
    		 $(this).children().children().children('span').removeClass("glyphicon glyphicon-ok").addClass("glyphicon glyphicon-remove")
       	     if($(this).children('#perfilnome').html() == "USUARIOSIS" ){      
    		     $(this).children().children().children('span').removeClass("glyphicon glyphicon-remove").addClass("glyphicon glyphicon-ok")  
    		     $(this).children().children('button').attr("disabled", true);		    		  
	    	  }
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
  		listitems += '<button class="button"id="botaoperfil" style="border-radius: 50%;background-color: #f9f9f9;margin-top: 0%;">'
  		listitems += '<span class="glyphicon glyphicon-remove"></span>'
  	    listitems += '</button>      </div>'	  			
  		listitems += '</div>'	  			 
    }

   $('.liperfil').append(listitems);
   
    $('.liperfil #divperfil').each(function(index) {
    	  if($(this).children('#perfilnome').html() == "USUARIOSIS" ){      
    		  $(this).children().children().children('span').removeClass("glyphicon glyphicon-remove").addClass("glyphicon glyphicon-ok")  
    		  $(this).children().children('button').attr("disabled", true);		    		  
	    	  }
	    });    
	   
        
    };
  
	function limparFormulario(){
		$('#frmusuariocadastro').each (function(){
   			  this.reset();
   			});
  }; 
function limparPerfil(){			  
	     $('.ulperfil .liperfil .row').each(function(index, element) {
		 	   element.remove();
	     });
  }; 

function sonumeros( string )
	{
		var novastring = string.replace(/[\.-]/g, "");
	alert( novastring );
	return novastring;
};
function marcartodosperfis() {
    $('.liperfil #divperfil').each(function(index) {
  	  if($(this).children('#perfilnome').html() != "ADMIN" ){      
  		  $(this).children().children().children('span').removeClass("glyphicon glyphicon-remove").addClass("glyphicon glyphicon-ok")  	    		  
  	  }
  });
}