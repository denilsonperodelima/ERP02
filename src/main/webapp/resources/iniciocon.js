function validarperiodo(){
    $.ajax({
    	type: 'GET',
    	url: getAmbiente() +  "/usuario/periodo/" + sessionStorage.getItem("id") +"/" + sessionStorage.getItem("idpessoa") +"/"  + sessionStorage.getItem("email"),
    	dataType:'json',
        beforeSend : function (xhr){
        	xhr.setRequestHeader('Authorization', sessionStorage.getItem("arpz"))
        },
        success:function(response){  
		       	switch ((response['retorno'].codret)) { 
	  		      	case '999':
		  		      	$("#msg").removeClass("hidden").addClass("row");
		  		      	$("#msgtexto").html( "<strong>" + "Atenção " + "</strong>" + JSON.stringify(response['retorno'].mensagem));
			        	sessionStorage.setItem("arpz", "");	
			        	sessionStorage.setItem("id", "");
			        	sessionStorage.setItem("usu", "");
			        	sessionStorage.setItem("nome", "");
			        	sessionStorage.setItem("email", "");
			  		    break;
	  		      	default:
	  		      		if(sessionStorage.getItem("id") != 1){
		  			      	$("#empresachamar").addClass("hidden"); 
	  		      		}
 		      		
	  		      	    break;
        	    }
        },
        error:	function(request, status, error, response) {	
	       	switch (request.status) { 
	      	case 403: 
	        	alert("Usuário não autorizado para esta operação");		  		      		
	      		break;
	      	default:	
	        	 $('#msg').html( "Erro *** " + JSON.stringify(request.responseJSON));  
                 $('#msg').css("color","red");
  		         break;
	         }
        }		       	
    });			
}
	     
