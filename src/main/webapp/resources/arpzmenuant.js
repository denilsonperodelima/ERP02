
        $("#hamburguer").mouseover( function (e){
   			e.preventDefault();
            alert("Mouse over");      	
        }
        $("#hamburguer").click( function (e) {
   			e.preventDefault();
            alert("Mouse click");     
  		});        
        $("#liIncluirCli").click( function () {
 			var url = './pessoa.html?param1=';
 	 		url += getUrlVars()["param1"];
 			url += '&param2='
 	 		url += getUrlVars()["param2"];		
 	 		url += '&param3=CLIENTE'
 	        window.parent.location.href = url;    
  		}); 
   		  	   		
   		$("#liIncluirFor").click( function () {
 			var url = './pessoa.html?param1=';
 	 		url += getUrlVars()["param1"];
 			url += '&param2='
 	 		url += getUrlVars()["param2"];		
 	 		url += '&param3=FORNECEDOR'
 	        window.parent.location.href = url;    
  		}); 

   		$("#liIncluirVend").click( function () {
 			var url = './pessoa.html?param1=';
 	 		url += getUrlVars()["param1"];
 			url += '&param2='
 	 		url += getUrlVars()["param2"];		
 	 		url += '&param3=VENDEDOR'
 	        window.parent.location.href = url;    
  		}); 
    		
   		$("#liIncluirPro").click( function () {
 			var url = './produto.html?param1=';
 	 		url += getUrlVars()["param1"]	
 	        window.parent.location.href = url;    
  		}); 
   		
   		//Chama form pedidos
  		$('#liIncluirPed').on("click",  function(){
 			var url = './pedidobusca.html?param1=';
 			url += getUrlVars()["param1"];;
 	        window.parent.location.href = url; 
    	});

  		
 