  		$(document).ready(function(){
  			
			$('#frmcadastro').bind('submit',function(e){
	  			e.preventDefault();
	  		});
  		});
 		
    		
  		//Grava dados Teste 
   		$("#btnTeste").click( function () {

			// alert ("Entrou no Botão"); 
			
   			$('#msg').html("");
   			
            var first = "null";

			var valEmpresa = "52928736000102";
			var tipoPessoa = "F";

			var docSemMaskString = "52928736000102";
			
			if (docSemMaskString == ""){
				docSemMaskString = "0"	;
			}
			
			var docSemMask =  "52928736000102";;
			
			pedidoitem = " [  ";

			pedidoitem += "  { ";
				
			pedidoitem += '"id_produto": ' + 55;
			pedidoitem += ',"quantidade": ' + 3;
			pedidoitem += ',"valorunitario": ' + 44;			
			pedidoitem += " } , ";	

			pedidoitem += "  { ";
			

			pedidoitem += '"id_produto": ' + 56;
			pedidoitem += ',"quantidade": ' + 4;
			pedidoitem += ',"valorunitario": ' + 45;			
			pedidoitem += " } ";	
	
			pedidoitem += " ]";	
			
			dadosJson = "{ ";
			if (first != "null") {  
				dadosJson += '"id": ' + '"'  + first + '",';
			}
			
			// alert (valEmpresa); 
			
   			dadosJson += '"id_empresa": ' + valEmpresa;
   		 
   		    docSemMask = "123";
   			tipoPessoa = "45"; 
   		 
   			dadosJson += ',"id_cliente": ' + '"'  + tipoPessoa + '"';
   			dadosJson += ',"id_vendedor": ' + docSemMask;

   			dadosJson += ',"itens": ' + '"'  + 33 + '"';

   			dadosJson += ',"valor": ' + '"' + 67 + '"';
   			
   			dadosJson += ',"pedidoitem": ' + pedidoitem;			

			dadosJson += " }";	
			
			
            alert (dadosJson);
			
   			var dadosJ = JSON.stringify(dadosJson);
            var obj1 = $.parseJSON(dadosJ); //convert string to obj

	   		var ambiente = getAmbiente();
	   	    arg = "";
	   		arg += ambiente;
	   	    arg += '/pessoa/rest/pedido/';
	   		    
  		    $.ajax({
  		    	type: 'POST',
  		    	url: arg,
  		    	contentType: 'application/json;charset=utf-8',
  		    	dataType: 'json',
  		    	method: 'POST',
				cache: false,
  		        data: obj1, 		    	
  		        success:function(response){
  		        	 $('#msg').html(response.msg);
  		        },
  		        error: function(e, msg) {
  		             $('#msg').html("***Erro - satus="  + e.status +  "---> " + e.statusText);
  		             $('#msg').css("color","##FF0000");

			    }
  		    }); 
  		    
  		});


  