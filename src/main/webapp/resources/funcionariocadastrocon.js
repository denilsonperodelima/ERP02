	function funcionariocadastrocon(url, operacao) {
	
	    $.ajax({
	    	type: 'GET',
	    	url: getAmbiente() + url ,
	    	dataType:'json',
            beforeSend : function (xhr){
            	xhr.setRequestHeader('Authorization', sessionStorage.getItem("arpz"))
            },
	        success:function(response){ 
  		       	switch (operacao) { 
  		      	case "consultarpessoanome":  
  		         	  carregarPessoaNome(response); 
  				      break;
  		      	case "consultarperfis":  
  		      	      carregarperfis(response); 
				      break; 
  		      	case "consultarfuncionarioid":  
  		              carregarfuncionario(response); 
				      break; 				      
  		      	case "carregarcombos":  		      			  		      		
	  		  	    $.each(response.subgrupos, function(i, item) {		
	  	  		       	switch (item.descricao) { 	
	  	  		         	case "TIPOENDER":
	  	  		         		  carregarComboSemValue($("#tipoendereco"), JSON.stringify(item['subgrupoitens'])) 	
			  		      	      break;	
	  	  		         	case "STATUS":
	  	  		         		  carregarComboSemValue($("#status"), JSON.stringify(item['subgrupoitens'])) 	
			  		      	      break;	
	  	  		         	case "ESTCIVIL":
	  	  		         		  carregarComboSemValue($("#EstadoCivil"), JSON.stringify(item['subgrupoitens'])) 	
			  		      	      break;	
	  	  		         	case "CONTATO":
	  	  		         		  carregarComboSemValue($("#modaltipocontato"), JSON.stringify(item['subgrupoitens'])) 	
			  		      	      break;
	  	  		         	case "CONTATOITEM":
	  	  		         		  carregarComboSemValue($("#tipocontatoitensaux"), JSON.stringify(item['subgrupoitens'])) 	
			  		      	      break;	  	  		         		  
	  	  		       	}		  						  
	  			   });
		      		   break;				      
  		      	default:
  		        	  alert("funcionariocadastrocon - Metodo get no status success - operação não informada");	
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
  	  		        	    alert("Metodo get1 no status success - operação não informada - " + getAmbiente() + url + " operação " + operacao);	
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
	  	 		      	case "consultarpessoanome":  
	  	 		      	case "consultarfuncionarioid":  
	  	 		      	case "carregarcombos":  	  	 		      			  	 		      	
		  		        	 $('#msg').html( "Erro *** " + JSON.stringify(request));  
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
	
	function funcionariocadastrogrv(url, json, operacao) {
			
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
  		      	case "gravarfuncionario":  
		              carregarfuncionario(response); 
 		        	  $('#msg').html("Operação realizada com sucesso !!!");	
  		              $('#msg').css("color","blue");
	  		          break;
  		      	case "gravarfuncionariopelaemp":  //sendo chamdo pela pagina empresacadastro 
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
	  	  		      	case "gravarfuncionario":
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
	function funcionariocadastroalterar(url, json, operacao) {
		
   		$.ajax({
			  	type: 'PUT',
		    	url: getAmbiente() + url,
		    	contentType: 'application/json;charset=utf-8',
		    	method: 'PUT',
			cache: false,
		        data: json, 
            beforeSend : function (xhr){
            	//xhr.setRequestHeader('Authorization', sessionStorage.getItem("arpz"))
            },
	        success:function(response){ 
  		       	switch (operacao) { 
  		      	case "gravarfuncionario":  
  		              carregarfuncionario(response);    	  		       
 		        	  $('#msg').html("Operação realizada com sucesso !!!");	
  		              $('#msg').css("color","blue");
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
	  	  		      	case "gravarfuncionario":
		  		        	 $('#msg').html( "Erro *** " + JSON.stringify(request.responseJSON));  
	 		                 $('#msg').css("color","red");
	  		  		         break;
	  	  		      	default:
	   		        	     alert("Metodo PUT no status error - operação não informada");		  	  		      		
	  	  		      	     break;
	  	  		        }
	                break;
	  		        }	
  		        }	  		        		  		      				            
	    });		
	}