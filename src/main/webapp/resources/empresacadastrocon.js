	function operacaoPOST() {
	    empresa  = serializeForm($("#fieldset1 :input"), true);
	    empresa = empresa.replace("[","").replace("]","");
	    empresa = empresa.replace('"":"",','');
	    empresa = empresa.replace(',"":""','');
	    
		json  = "{";	
		json += empresa;	
		json += "}";

		
	    //alert("json " + json);
	    //console.log('your message' +json);
	    
	   		$.ajax({
			  	type: 'POST',
		    	url: getAmbiente() + "/empresa",
		    	contentType: 'application/json;charset=utf-8',
		    	method: 'POST',
			cache: false,
		        data: json, 
            beforeSend : function (xhr){
            	xhr.setRequestHeader('Authorization', sessionStorage.getItem("arpz"))
            },
		        success:function(response){	
		        	 ret = JSON.parse((response));  		        	 	  		        	
		        	 $('#id').val(JSON.stringify(ret['retorno'].id).replace(/"/g,""));
		        	 //sessionStorage.setItem("id", $('#id').val());
		        	 //sessionStorage.setItem("id2", "SUPER");
		        	 $('#msg').html(JSON.stringify(ret['retorno'].mensagem).replace(/"/g,""));		  		        	 
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
	function operacaoGET(url, operacao) {
	
	    $.ajax({
	    	type: 'GET',
	    	url: getAmbiente() + url ,
	    	dataType:'json',
            beforeSend : function (xhr){
            	xhr.setRequestHeader('Authorization', sessionStorage.getItem("arpz"))
            },
	        success:function(response){ 
  		       	switch (operacao) { 
  		      	case "carregarcombos":  		      			  		      		
		  		  	    $.each(response.subgrupos, function(i, item) {		
		  	  		       	switch (item.descricao) { 	
		  	  		         	case "STATUS":
		  	  		         		  carregarComboSemValue($("#status"), JSON.stringify(item['subgrupoitens'])) 	
				  		      	      break;
		  	  		         	case "SEGMENTO":
		  	  		         		  carregarComboSemValue($("#segmento"), JSON.stringify(item['subgrupoitens'])) 	
				  		      	      break;
		  	  		         	case "PESSOA":
		  	  		         		  carregarComboSemValue($("#pessoacb"), JSON.stringify(item['subgrupoitens'])) 	
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
	  		      	default:
	  		   		    $('#msg').html(JSON.stringify(request.responseJSON));		
	  		        }		
  		        }	  		        		  		      				            
	    });		
	}
	function administradorcadastrogrv(url, json, operacao) {
		
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
		  		        	 $('#msg').html( "Erro *** " + JSON.stringify(request.responseJSON));  
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

	
	function empresatabela(url, json, operacao) {
		
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
  		      	case "gravartabela":  
 		        	  $('#msg').html("Operação realizada com sucesso !!!");	
  		              $('#msg').css("color","blue");
	  		          break;
  		      	default:
  		        	  alert("Metodo POST empresatabela no status success - operação não informada");	
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
	  	  		      	case "gravartabela":
		  		        	 $('#msg').html( "Erro *** " + JSON.stringify(request));  
	 		                 $('#msg').css("color","red");
	  		  		         break;
	  	  		      	default:
	   		        	     alert("Metodo POST empresatabela no status error - operação não informada - " + operacao);		  	  		      		
	  	  		      	     break;
	  	  		        }
	                break;
	  		        }	
  		        }	  		        		  		      				            
	    });		
	}
	function esquecisenha(url, json, operacao) {
	    
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
		        	 alert("Operação realizada com sucesso !!!")
		        	 $('#msg').html(JSON.stringify(ret['retorno'].mensagem).replace(/"/g,""));		  		        	 
		             $('#msg').css("color","blue");
		        } ,
		        error:	function(request, status, error) {	  
 		        	 $('#msg').html( "Erro *** " + JSON.stringify(request));  
	                 $('#msg').css("color","red");
		    }	
	  		});	        
		
	}
	function gerarprodutos(url, json, operacao) {
	    
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
	        	 $('#msg').html(JSON.stringify(ret['retorno'].mensagem).replace(/"/g,""));		  		        	 
	             $('#msg').css("color","blue");
	        } ,
	        error:	function(request, status, error) {	  
		        	 $('#msg').html( "Erro *** " + JSON.stringify(request));  
                 $('#msg').css("color","red");
	    }	
  		});	        
	
}