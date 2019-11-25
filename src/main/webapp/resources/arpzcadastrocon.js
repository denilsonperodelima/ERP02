function alterararpz() {
 		$.ajax({
			  	type: 'POST',
	    	    url:  getAmbiente() +  "/usuario/alteraarpz/" + sessionStorage.getItem("email"),
		    	contentType: 'application/json;charset=utf-8',
		    	method: 'POST',
			cache: false,
	        data: dataformatadaarpz(),
	            beforeSend : function (xhr){
	            	xhr.setRequestHeader('Authorization', sessionStorage.getItem("arpz"))		  		        
	            } 	, 		  		        
		        success:function(data, status, xhr){	
		        	alert("Alteração efetuada com sucesso !!!" );
		        } ,
		        error: function(e, msg) {  
		 	       	alert(e.status + " /  "  + e.responseJSON.message);
		    }
	});	
}