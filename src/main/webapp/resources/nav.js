        $("#hamburguer").mouseover( function (e){
   			e.preventDefault();
            $('#modalhamburguer').modal('toggle');     	
        });
    	
   		$("#empresachamar").click( function (e) {
   			e.preventDefault();
   	        window.parent.location.href = getAmbiente() +  "/empresacadastro.html"  			
        });
   		
   		$("#usuariochamar").click( function (e) {
   			e.preventDefault();
   	        window.parent.location.href = getAmbiente() +  "/usuariocadastro.html"  
        });    	        
   		$("#clientechamar").click( function (e) {
   			e.preventDefault();
   	        window.parent.location.href = getAmbiente() +  "/clientecadastro.html"    	        
        });   		
   		$("#menulogin").click( function (e) {
   			e.preventDefault();
   	        window.parent.location.href = getAmbiente() +  "/index.html"    	        
        });   	
   		$("#configchamar").click( function (e) {
   			e.preventDefault();
   	        window.parent.location.href = getAmbiente() +  "/configuracoes.html"    	        
        });   		
   		$("#funcionariorchamar").click( function (e) {
   			e.preventDefault();
   	        window.parent.location.href = getAmbiente() +  "/funcionariocadastro.html"    	        
        });    		
   		
   		        
        

       
 