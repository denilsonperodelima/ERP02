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
  		      	case "carregarprodutos": 
  		      	      carregarprodutosautocomplete(response);  //itempedidocontrole
		      		  break;  
  		      	case "carregarpedidoid": 
  		      		  carregarpedidoitens(response);  
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
	  		        	alert(JSON.stringify(request.responseJSON));		
	  		        }		
  		        }	  		        		  		      				            
	    });		
	}  
function gravarpedido(json){
	$.ajax({
		  	type: 'POST',
	    	url: getAmbiente() + "/pedidos",
	    	contentType: 'application/json;charset=utf-8',
	    	method: 'POST',
		cache: false,
	        data: json, 
        beforeSend : function (xhr){
        	xhr.setRequestHeader('Authorization', sessionStorage.getItem("arpz"))
        },
	        success:function(response){	
//	        	 console.log(JSON.stringify(response))
	        	 carregarpedidoitens(response);
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
function finalizarpedido(json){
	$.ajax({
		  	type: 'POST',
	    	url: getAmbiente() + "/pedidos/finalizar",
	    	contentType: 'application/json;charset=utf-8',
	    	method: 'POST',
		cache: false,
	        data: json, 
        beforeSend : function (xhr){
        	xhr.setRequestHeader('Authorization', sessionStorage.getItem("arpz"))
        },
	        success:function(response){	
	        	 setarpedidofinalizado(hoje())
	        	 $("#dtaltera").val(hoje());
	        	 montarlinhatexto(); //trilhaauditoriacontrole
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