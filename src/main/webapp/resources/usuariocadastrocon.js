	function usuariocadastrocon(url, operacao) {
	
	    $.ajax({
	    	type: 'GET',
	    	url: getAmbiente() + url ,
	    	dataType:'json',
            beforeSend : function (xhr){
            	xhr.setRequestHeader('Authorization', sessionStorage.getItem("arpz"))
            },
	        success:function(response){ 
  		       	switch (operacao) { 
  		      	case "consultarusuarioid":  
				      atualizarUsuario(response); 
				      break;  		       	  		      
  		      	case "consultaremail":  
  				      atualizarUsuario(response); 
  				      break;
  		      	case "consultarperfis":  
  		      	      carregarperfis(response); 
				      break;  				        				       				    
  		      	default:
  		        	  alert("1-Metodo get no status success - operação não informada");	
  		      	      break;
  		        }	
	        },
		        error:	function(request, status, error, response) {	
	  		       	switch (request.status) { 
	  		      	case 200: 
	  	  		       	switch (operacao) { 
	  	  		      	case "consultaremail":  
		  		        	alert("E-mail não encontrado para alteração");		  		      		
		  		      		break;
	  	  		      	case "consultarperfis":    	  		      		
	    		      	    carregarperfis(JSON.stringify(request.responseText)); 
	  				      break;		  		      		
	  	  		      	default:	  	  		      		
  	  		        	    alert("2-Metodo get no status success - operação não informada - " + getAmbiente() + url + " operação " + operacao);	
  	  		      	        break;
	  	  		        }
	  		       	break;
	  		      	case 403: 
	  		        	alert("Usuário não autorizado para esta operação");		  		      		
	  		      		break;
	  		      	default:	
	  	  		       	switch (operacao) { 
	  	  		      	case "carregargrupo":
	  	  		      	case "carregarsubgrupos":
	  	  		      	case "consultaremail": 	  	  		      			  	  		      	
		  		        	 $('#msg').html( "Erro *** " + JSON.stringify(request.responseJSON));  
	 		                 $('#msg').css("color","red");
	  		  		         break;
	  	  		      	default:
	   		        	     alert("Metodo get no status error - operação não informada");		  	  		      		
	  	  		      	     break;
	  	  		        }
	                break;
	  		        }	
  		        }	  		        		  		      				            
	    });		
	}
	
	function usuariocadastrogrv(url, json, operacao) {	
   		$.ajax({
			  	type: 'POST',
		    	url: getAmbiente() + url,
		    	contentType: 'application/json;charset=utf-8',
		    	method: 'POST',
			cache: false,
		        data: json, 
            beforeSend : function (xhr){
            	xhr.setRequestHeader('Authorization', sessionStorage.getItem("arpz"))
            },
	        success:function(response){ 
  		       	switch (operacao) { 		      
  		      	case "incluirusuario":  
				      atualizarUsuarioLista(response);    
 		        	  $('#msg').html("Operação realizada com sucesso !!!");	
  		              $('#msg').css("color","blue");
	  		          break;
  		      	case "gravarusuario":  
				      atualizarUsuario(response);    
		        	  $('#msg').html("Operação realizada com sucesso !!!");	
		              $('#msg').css("color","blue");
	  		          break;	  		          
  		      	case "incluirusuariopelaemp":  //sendo chamdo pela pagina empresacadastro 
		        	  $('#msgadmin').html("Operação realizada com sucesso !!!");	
		              $('#msgadmin').css("color","blue");
	  		          break;	  		          
	  		        
  		      	default:
  		        	  alert("Metodo POST no status success - operação não informada");	
  		      	      break;
  		        }	        	
	        },
		        error:	function(request, status, error) {	
	  		       	switch (request.status) { 
	  		      	case 422: //campos inconsistidos
	  		        	data = JSON.parse(JSON.stringify(request.responseJSON));
	  		        	alert(JSON.stringify(data['errors']).replace(/"fieldName":/g,"").replace(/"message":/g,"").replace(/,/g,"\n"));		  		      		
	  		      		break;	  		       	
	  		      	case 403: 
	  		        	alert("Usuário não autorizado para esta operação");		  		      		
	  		      		break;
	  		      	default:	
	  	  		       	switch (operacao) { 	  	  		    
	  	  		      	case "gravarusuario":
	  	  		      	case "incluirusuario":	  	  		      		
		  		        	 $('#msg').html( "Erro *** " + JSON.stringify(request));  
	 		                 $('#msg').css("color","red");
	  		  		         break;
	  	  		      	default:
	   		        	     alert("Metodo POST no status error - operação não informada - " + operacao);		  	  		      		
	  	  		      	     break;
	  	  		        }
	                break;
	  		        }	
  		        }	  		        		  		      				            
	    });		
	}
