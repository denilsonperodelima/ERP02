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
  		      	case "consultarpessoanome":  		       	
	         	      carregarPessoaNome(response);
	         	      break;
  		      	case "consultarusuarionome":  		       	
	         	      carregarPessoaNome(response);
	         	      break;	         	      
  		      	case "carregarcombos":  		      			  		      		
		  		  	    $.each(response.subgrupos, function(i, item) {		
		  	  		       	switch (item.descricao) { 	
		  	  		         	case "PESSOA":
		  	  		         		  carregarComboSemValue($("#tipopessoa"), JSON.stringify(item['subgrupoitens'])) 	
				  		      	      break;
		  	  		         	case "TIPOENDER":
		  	  		         		  carregarComboSemValue($("#tipoendereco"), JSON.stringify(item['subgrupoitens'])) 	
				  		      	      break;	
		  	  		         	case "STATUS":
		  	  		         		  carregarComboSemValue($("#situacaovendedor"), JSON.stringify(item['subgrupoitens'])) 	
				  		      	      break;	
		  	  		         	case "TIPOVEND":
		  	  		         		  carregarComboSemValue($("#tipovendedor"), JSON.stringify(item['subgrupoitens'])) 	
				  		      	      break;	
		  	  		         	case "CONTATO":
		  	  		         		  carregarComboSemValue($("#tipocontato"), JSON.stringify(item['subgrupoitens'])) 	
				  		      	      break;
		  	  		         	case "CONTATOITEM":
		  	  		         		  carregarComboSemValue($("#tipocontatoitem"), JSON.stringify(item['subgrupoitens'])) 	
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