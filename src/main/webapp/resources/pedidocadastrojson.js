	function formatarjsonpedidoitem(){
			
		var pedido = '"id": ' + '"' + $('#id').val() + '"';
		pedido += ',"clientenome": ' + '"' +  $('#clientenome').val() + '"';     		
		pedido += ',"idempresa": ' + '"' +   sessionStorage.getItem("id") + '"';  
		pedido += ',"usuinc": ' + '"' +  $('#usuinc').val() + '"'; 
		pedido += ',"usualt": ' + '"' +  $('#usualt').val() + '"'; 
		pedido += ',"dtinclui": ' + '"' +  $('#dtinclui').val() + '"'; 
		pedido += ',"dtaltera": ' + '"' +  $('#dtaltera').val() + '"'; 
		
		var vend =  ',"' + 'vendedor' +'"' + ":" ; 
		vend  += "{"  + '"' + '@type":"vendedor' +'",' + '"' + 'id' +'":' + '"' + $('#vendedornome').attr("idvendedor") + '"';		 
		vend += ',"nome": ' + '"' +  $('#vendedornome').val() + '"'; 
		vend  += "}" ;
		
		var cli =  ',"' + 'cliente' +'"' + ":" ; 
		cli  += "{" + '"' + '@type":"cliente' +'",' + '"' + 'id' +'":' + '"' +  $('#clientenome').attr("idcliente") + '"';		
		cli += ',"nome": ' + '"' +  $('#clientenome').val() + '"'; 
		cli  += "}" ;	
		
		var empresa =  ',"' + 'empresa' +'"' + ":" ; 
		empresa +=getEmpresa()
			
		var itens =  ',"' + 'itens' +'"' + ":[" ; 
		itens += serializeFormOccurs($("#itempedido :input"),8)
		itens += "]"     
	   		    	

		json  = "{" ;	
		json += pedido;	
		//json += empresa;
		json += cli;
		if ($('#vendedornome').attr("idvendedor") != "null") {
			json += vend;	
		}
		json += itens;		
		json += "}";
		
		return json;
		
		
	}		
	function formatarjsonpedido(){
		
		var pedido = '"id": ' + '"' + $('#id').val() + '"';
		pedido += ',"clientenome": ' + '"' +  $('#clientenome').val() + '"';     		
		pedido += ',"idempresa": ' + '"' +   sessionStorage.getItem("id") + '"';  
		pedido += ',"usuinc": ' + '"' +  $('#usuinc').val() + '"'; 
		pedido += ',"usualt": ' + '"' +  $('#usualt').val() + '"'; 
		pedido += ',"dtinclui": ' + '"' +  $('#dtinclui').val() + '"'; 
		pedido += ',"dtaltera": ' + '"' +  $('#dtaltera').val() + '"'; 
		
		var vend =  ',"' + 'vendedor' +'"' + ":" ; 
		vend  += "{"  + '"' + '@type":"vendedor' +'",' + '"' + 'id' +'":' + '"' + $('#vendedornome').attr("idvendedor") + '"';		 
		vend += ',"nome": ' + '"' +  $('#vendedornome').val() + '"'; 
		vend  += "}" ;
		
		var cli =  ',"' + 'cliente' +'"' + ":" ; 
		cli  += "{" + '"' + '@type":"cliente' +'",' + '"' + 'id' +'":' + '"' +  $('#clientenome').attr("idcliente") + '"';		
		cli += ',"nome": ' + '"' +  $('#clientenome').val() + '"'; 
		cli  += "}" ;	
		
		json  = "{" ;	
		json += pedido;	
		json += cli;
		json += vend;	
		json += "}";
		
		return json;
	}		
	

