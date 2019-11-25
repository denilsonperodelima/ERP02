	$(document).ready(function(){
		$('#configuracoes').bind('submit',function(e){
  			e.preventDefault();
  		});				
	});
	
    window.onload = function(e) {  
		e.preventDefault(); 
     	 $('#emp').html(sessionStorage.getItem("nome"));
    	  iniciarFormulario();

    	 operacaoGET("/grupo/empresa/" + sessionStorage.getItem("id")  , "carregargrupo")
    	 $("#combogrupo").focus();  				
  	}  	//document load close;	
    
  	function iniciarFormulario(){
   	   
  	    limparFormulario() 
  	    		
		$('#msgcombo').html("");		    
	}
	function limparFormulario(){
		$('#configuracoes').each (function(){
   			  this.reset();
   			});
  };  	
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
  		      	case "carregargrupo":  
		 			   var listitems = '<option value=' + "" + '>' + "" + '</option>';	    
  				       $("#combogrupo").append(listitems);
	  		  	       item ="["
		  		  	   $.each(response, function(i) {
		  		  		 item += '{"valor": '+ '"' + response[i][0] + '"';  
		  		  		 item += ',"descricao": ' + '"' + response[i][1] + '"},';  		  		  		  			  						  
		  			   });
	  		  	       item +="]";
	  		  	       item = item.replace(",]","]")
		  		  	   carregarComboValue($("#combogrupo"), item) 
  		      		   break;
  		      	case "carregarsubgrupos": 
  		      	     limparSubGrupos();
	  		         carregarSubGrupos(response);
	  		         break;
  		      	case "carregarsubgrupositens": 
 		      	     limparSubGruposItens();
	  		         carregarSubGruposItens(response);
	  		         break;
  		      	default:
  		        	  alert("Metodo get no status success - operação não informada");	
  		      	      break;
  		        }	        	
	        },
		        error:	function(request, status, error) {	
	  		       	switch (request.status) { 
	  		      	case 403: 
	  		        	alert("Usuário não autorizado para esta operação");		  		      		
	  		      		break;
	  		      	default:	
	  	  		       	switch (operacao) { 
	  	  		      	case "carregargrupo":
	  	  		      	case "carregarsubgrupos": 
		  		        	 $('#msgcombo').html( "Erro *** " + JSON.stringify(request.responseJSON));  
	 		                 $('#msgcombo').css("color","red");
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
	
	function operacaoPOST(url, json, operacao) {
			
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
  		      	case "gravargrupo": 
		      	     limparSubGruposItens(); 	  		       
 		        	 $('#msgcombo').html("Operação realizada com sucesso !!!");	
  		             $('#msgcombo').css("color","blue");
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
	  	  		      	case "gravargrupo":
		  		        	 $('#msgcombo').html( "Erro *** " + JSON.stringify(request.responseJSON));  
	 		                 $('#msgcombo').css("color","red");
	  		  		         break;
	  	  		      	default:
	   		        	     alert("Metodo POST no status error - operação não informada");		  	  		      		
	  	  		      	     break;
	  	  		        }
	                break;
	  		        }	
  		        }	  		        		  		      				            
	    });		
	}
       