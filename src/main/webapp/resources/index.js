$(document).ready(function(){
	$('#index').bind('submit',function(e){
		e.preventDefault();
	});
});


$("#txtUsuario").val("denilsonperodelima@gmail.com");
$("#txtSenha").val("cachorroloko");

$("#esquecisenha").css({marginLeft:'17%'});
    
$("#btnNovo").click( function (e) {
	e.preventDefault();  
	   if (consistirpagina() == false) {
	       return;	
	   }; 	
	  validarusuario("logar");	
});	

$("#arpzalterar").click( function (e) {
	e.preventDefault();  
	
	   if (consistirpagina() == false) {
	       return;	
	  }; 	
	  validarusuario("alterar");	
});  		
   		
function consistirpagina() {
		
	if ($("#txtUsuario").val() == "") {
	    alert("Informe o email "); 	
        $("#txtUsuario").focus();
		return false;
	}


	if ($("#txtSenha").val() == "") {
	    alert("Informe a senha"); 	
        $("#txtSenha").focus();
		return false;
	}      
}   		