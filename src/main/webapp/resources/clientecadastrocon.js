	function consultarCliente(url) {
	    $.ajax({
	    	type: 'GET',
	    	url: url ,
	    	dataType:'json',
            beforeSend : function (xhr){
            	xhr.setRequestHeader('Authorization', sessionStorage.getItem("arpz"))
            },
	        success:function(response){
	        	//alert("type of response " + typeof(response))
	        	if (typeof(response) == "undefined"){
	        		alert("Documento não encontrado");		  		      		
                    return;
	        	}
	        	
	        	carregarcliente(response);
	        },
		        error:	function(request, status, error) {	 
  		       	switch (request.status) { 
  		      	case 403: 
  		        	alert("Usuário não autorizado para esta operação");		  		      		
  		      		break;
  		      	default:
  		        	alert(JSON.stringify(request.responseJSON));		
  		        }	  		        		  		      				            
	        }
	    });		
	}

		
	function operacaoGET(url, operacao) {
	
	    $.ajax({
	    	type: 'GET',
	    	url: getAmbiente() + url ,
	    	dataType:'json',
	        async: false, 
            beforeSend : function (xhr){
            	xhr.setRequestHeader('Authorization', sessionStorage.getItem("arpz"))
            },
	        success:function(response){ 
  		       	switch (operacao) { 
  		      	case "carregarcombos":  		      			  		      		
		  		  	    $.each(response.subgrupos, function(i, item) {	
		  	  		       	switch (item.descricao) { 	
		  	  		         	case "PESSOA":
		  	  		         		  carregarComboSemValue($("#tipopessoa"), JSON.stringify(item['subgrupoitens'])) 
		  	  		         		  $('#tipopessoa').val("JURIDICA").change();		    
		  	  		         		  configurarPessoa("JURIDICA");	    
		  	  		         		  $('#tipopessoa').focus();
				  		      	      break;
		  	  		         	case "ENDERECO":
		  	  		         		  carregarComboSemValue($("#tipoendereco"), JSON.stringify(item['subgrupoitens'])) 	
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
  		        	  alert("Metodo get - operação não informada");	
  		      	      break;
  		        }	        	
	        	
	        	

	        },
		        error:	function(request, status, error) {	
	  		       	switch (request.status) { 
	  		      	case 403: 
	  		        	alert("Usuário não autorizado para esta operação");		  		      		
	  		      		break;
	  		      	case 200: 	  		      		
	  	  		       	switch (operacao) { 
	  	  		      	case "carregarcombos":  		      			  		      		
				        	   window.parent.location.href = getAmbiente() +  "/errocargacombo.html" 
	  	  		      		   break;
	  	  		      	default:
	  	  		        	  alert("Metodo post - operação não informada");	
	  	  		      	      break;
	  	  		        }
	  	  		        break;   	
	  		      	default:	  		      		
	  		        	alert(JSON.stringify(request.responseJSON));
	  		      	    break;
	  		        }		
  		        }	  		        		  		      				            
	    });		
	}  
function gravarclinte(json){
	$.ajax({
		  	type: 'POST',
	    	url: getAmbiente() + "/pessoa",
	    	contentType: 'application/json;charset=utf-8',
	    	method: 'POST',
		cache: false,
	        data: json, 
        beforeSend : function (xhr){
        	xhr.setRequestHeader('Authorization', sessionStorage.getItem("arpz"))
        },
	        success:function(response){	
	        	carregarcliente(response);
	        	 $('#msg').html("Operação realizada com sucesso !!!");	
	             $('#msg').css("color","blue");
	        } ,
	        error:	function(request, status, error) {	  		        	
	       	switch (request.status) { 
	      	case 422: 
	        	data = JSON.parse(JSON.stringify(request.responseJSON));
	        	alert(JSON.stringify(data['errors']).replace(/"fieldName":/g,"").replace(/"message":/g,"").replace(/,/g,"\n"));		  		      		
	      		break;
	      	case 403: 
	        	alert("Usuário não autorizado !!!");		  		      		
	      		break;	  		      			  		      		
	      	default:
	        	 $('#msg').html( "Erro *** " + JSON.stringify(request.responseJSON));  
	             $('#msg').css("color","red");
	        }	  		        	
	    }			    
  		});	    	    	
}	