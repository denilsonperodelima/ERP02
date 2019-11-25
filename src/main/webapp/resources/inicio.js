  		$(document).ready(function(){
			$('#erpprincipal').bind('submit',function(e){
	  			e.preventDefault();
	  		});
  		});

  	    window.onload = function() { 	    		
	      	 $('#usuario').html(sessionStorage.getItem("usu"));		
	      	 $('#emp').html(sessionStorage.getItem("nome"));
	      	 validarperiodo();
	  	}        
