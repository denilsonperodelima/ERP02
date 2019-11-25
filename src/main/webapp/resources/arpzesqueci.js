  		$(document).ready(function(){

			$('#frmcadastro').bind('submit',function(e){
	  			e.preventDefault();
	  		});

			
			$("#txtemail").val("mariax@gmail.com")
			
  		});

  		$("#voltar").css({marginLeft:'1%'});
  		
   		$("#btnEsqueci").click( function (e) {
  			e.preventDefault();
  			if( $("#txtemail").val() == ""){
  				alert("Informe o email");
  				$("#txtemail").focus();
  				return;
  			} 
  			
  			enviaarpz()
  			
  		});		
   		