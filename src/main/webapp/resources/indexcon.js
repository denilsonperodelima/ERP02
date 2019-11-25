function validarusuario(operacao)   {  
 		$.ajax({
			  	type: 'POST',
		    	url:  getAmbiente() +  "/login",
		    	contentType: 'x-www-form-urlencoded/json;charset=utf-8',
		    	method: 'POST',
			cache: false,
		        data: dataformatada()
		        , 
		        success:function(data, status, xhr){	
		        	sessionStorage.setItem("arpz", xhr.getResponseHeader('Authorization'));	
		        	sessionStorage.setItem("id", xhr.getResponseHeader('idempresa'));
		        	sessionStorage.setItem("usu", xhr.getResponseHeader('usu'));
		        	sessionStorage.setItem("idpessoa", xhr.getResponseHeader('idpessoa'));
		        	sessionStorage.setItem("email", $("#txtUsuario").val().replace(".", "-"));
		        	sessionStorage.setItem("nome", xhr.getResponseHeader('nome'));
		        	
		        	//alert("id " +  xhr.getResponseHeader('idempresa') + " // idpessoa " + xhr.getResponseHeader('idpessoa') + " // email " + $("#txtUsuario").val() + " // usu " + xhr.getResponseHeader('usu') )
	  		       	switch (operacao) { 
	  		      	case "logar":  
			        	  window.parent.location.href = getAmbiente() +  "/inicio.html" 
					      break;  		       	  		      
	  		      	case "alterar":  
			        	  window.parent.location.href = getAmbiente() +  "/arpzcadastro.html" 
	  				      break;  				        				       				    
	  		      	default:
	  		        	  alert("Operação nao prevista");	
	  		      	      break;
	  		        } 
		        } ,
		        error: function(e, msg) {  
		 	       	alert(e.status + " /  "  + e.responseJSON.message);
		    }
    	});   	
}

   		