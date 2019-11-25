	function produtocadastrocon(url, operacao, controle) {
	
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
	  	  		         	case "TIPO":
	  	  		         		  carregarComboSemValue($("#tipo"), JSON.stringify(item['subgrupoitens'])) 	
			  		      	      break;	
	  	  		         	case "STATUS":
	  	  		         		  carregarComboSemValue($("#situacao"), JSON.stringify(item['subgrupoitens'])) 	
			  		      	      break;	
	  	  		         	case "UNIDADE":
	  	  		         		  carregarComboSemValue($("#unidade"), JSON.stringify(item['subgrupoitens'])) 	
			  		      	      break;	
	  	  		         	case "CATEGORIA":
	  	  		         		  carregarComboSemValue($("#modalcategoriaprinc"), JSON.stringify(item['subgrupoitens'])) 	
			  		      	      break;
	  	    		      	default:
	  	  		      	      break;	  	  		         		  
	  	  		       	   }		  
	  	  		       	}) 
	  	  		       	break;
  		      	case "carregarsub": 
  		      	      $("select[id='"+ controle +"']").empty();
		  		  	  $.each(response.subgrupos, function(i, item) {	
		  	  		  		  carregarCombo($("select[id='"+ controle +"']"), JSON.stringify(item['subgrupoitens'])) 
		  	  		  	}) 
		  	  		  break;
  		      	case "consultarprodutoid":  
		              carregarproduto(response);
				      break; 				      
  		      	default:
  		        	  alert("Metodo get no status success - operação não informada");	
  		      	      break;
  		        }	
	        },
		        error:	function(request, status, error, response) {	
	  		       	switch (request.status) { 
	  		      	case 200: 
	  	  		       	switch (operacao) { 	  	  		       	
	  	  		      	default:	  	  		      		
  	  		        	    alert("Metodo get no status success - operação não informada - " + getAmbiente() + url + " operação " + operacao);	
  	  		      	        break;
	  	  		        }
	  		       	break;
	  		      	case 403: 
	  		        	alert("Usuário não autorizado para esta operação");		  		      		
	  		      		break;
	  		      	default:	
	  	  		       	switch (operacao) { 
	  	  		      	case "consultarprodutoid":
	  	  		      	case "xxxxxxxxxxxxxxxxx":
	  	  		      	case "xxxxxxxxxxxxxxxxxxxx": 	  	  		      			  	  		      	
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
	
	function produtocadastrogrv(url, json, operacao) {	
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
  		      	case "gravarproduto":  
  		              carregarproduto(response);   
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
	  	  		      	case "gravarproduto":
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