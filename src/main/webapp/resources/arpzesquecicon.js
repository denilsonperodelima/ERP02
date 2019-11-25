function enviaarpz() {
	$.ajax({
	  	type: 'POST',
	    url:  getAmbiente() +  "/usuario/enviararpz/" + $("#txtemail").val().replace('.', '-'),
    	contentType: 'application/json;charset=utf-8',
    	method: 'POST',
	cache: false,
    data: "",
    beforeSend : function (xhr){
    	xhr.setRequestHeader('Authorization', sessionStorage.getItem("arpz"))		  		        
    } 	,     
        success:function(data, status, xhr){	
        	alert("Envio efetuado com sucesso !!!" );
        } ,
        error: function(e, msg) {  
 	       	alert(e.status + " /  "  + e.responseJSON.message);
    }
  });	
}



   		