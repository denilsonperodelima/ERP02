
function getformulario() {

    empresa = '"' + 'empresa' + '"' + ":" + getEmpresa(); 
    
	funcionario = '"id": ' + "null"  + '';
	funcionario += ',"nome": ' +  '"' +  $("#nome").val() + '"';
	funcionario += ',"documento": ' +  '"' +  $("#cpfoucnpj").val() + '"';
	funcionario += ',"tipopessoa": ' +  '"' +  "FISICA" + '"';
	funcionario += ',"tiporelacionamento": ' +  '"' +  "FUNCIONARIO" + '"';	
	funcionario += ',"empresaid": ' +  '"' +  sessionStorage.getItem("id") + '"';		
	funcionario += ',' 

	//funcionario += serializeForm($("#cadastro :input"), true);
    funcionario = funcionario.replace("[","").replace("]","");
   
	//.replace(".","-")
    usuario = ',"usuarios": ' + '[{' ; 
    usuario += '"email": ' + '"' + $('#email').val() + '"';
    usuario += ',"nome": ' + '"' + $('#nome').val() + '"'
    usuario += ',"cpfOuCnpj": ' + '"' + $('#cpfoucnpj').val() + '"'
    usuario += ',"status": ' + '"' + $('#status option:selected').text() + '"'
    usuario += ',"dataexpira": ' + '"' + $('#dataexpira').val()  + '"'
	usuario += ',"idempresa": ' +  '"' +  sessionStorage.getItem("id") + '"';	
    usuario += ',"nomeempresa": ' + '"' +  sessionStorage.getItem("nome") + '"';     
    usuario += ',"tipo": ' + '"' + "1" + '"'       
    usuario += ',"id": ' + '"' +  $('#idusuario').val() + '"';
    
    usuario += ',"perfis": ' + '[' ; 
			
     $('.ulperfil .liperfil .row').each(function(index, element) {
    	 if ($(this).children().children().children('span').attr('class').indexOf("glyphicon-ok") >= 0){  	   	  
        	 usuario +=  $(this).children('div').html();
    	     usuario +=   "," 	;	 
    	 }
     });
	
	usuario = usuario.substring(0, usuario.length - 1); // retirando ultima virgula
	usuario += "]}]";  			

     	   		   
	//alert("usuario " + usuario) 
	//return;
	
	json  = "{";	
	json += usuario;
	json += empresa;	
	json += "}";
	
	json  = '{ "@type":"funcionario"' + ",";	
	json += funcionario;
	json += empresa;
	json += usuario;	
	json += "}";
	
    return json;
}
function getformulariousuario() {
   
    usuario = '{' ; 
    usuario += '"email": ' + '"' + $('#email').val() + '"';
    usuario += ',"nome": ' + '"' + $('#nome').val() + '"'
    usuario += ',"cpfOuCnpj": ' + '"' + $('#cpfoucnpj').val() + '"'
    usuario += ',"status": ' + '"' + $('#status option:selected').text() + '"'
    usuario += ',"dataexpira": ' + '"' + $('#dataexpira').val()  + '"'
	usuario += ',"idempresa": ' +  '"' +  sessionStorage.getItem("id") + '"';	
    usuario += ',"nomeempresa": ' + '"' +  sessionStorage.getItem("nome") + '"';     
    usuario += ',"tipo": ' + '"' + "1" + '"'   
    usuario += ',"senha": ' + '"' + "" + '"'       
    usuario += ',"id": ' + '"' +  $('#idusuario').val() + '"';
    
    usuario += ',"perfis": ' + '[' ; 
			
     $('.ulperfil .liperfil .row').each(function(index, element) {
    	 if ($(this).children().children().children('span').attr('class').indexOf("glyphicon-ok") >= 0){  	   	  
        	 usuario +=  $(this).children('div').html();
    	     usuario +=   "," 	;	 
    	 }
     });
	
	usuario = usuario.substring(0, usuario.length - 1); // retirando ultima virgula
	usuario += "]}";  			
     	   		   
	return usuario;
	
}			

	function carregarperiodotrabalhodefault(  )   { 
			
			$("#iddomingo").val("null"); 
			$("#horainiciodom").val("08").mask("00");
			$("#horafimdom").val("18").mask("00");

			$("#idsegunda").val("null"); 
			$("#horainicioseg").val("08").mask("00");
			$("#horafimseg").val("18").mask("00");
			
			$("#idterca").val("null"); 
			$("#horainicioter").val("08").mask("00");
			$("#horafimter").val("18").mask("00");

			$("#idquarta").val("null"); 
			$("#horainicioqua").val("08").mask("00");
			$("#horafimqua").val("18").mask("00");

			$("#idquinta").val("null"); 
			$("#horainicioqui").val("08").mask("00");
			$("#horafimqui").val("18").mask("00");

			$("#idsexta").val("null"); 
			$("#horainiciosex").val("08").mask("00");
			$("#horafimsex").val("18").mask("00");
			
			$("#idsabado").val("null"); 
			$("#horainiciosab").val("08").mask("00");
			$("#horafimsab").val("18").mask("00");   
		}
		function carregarperiodotrabalhosemrestricao(  )   { 
			
			$("#iddomingo").val("null"); 
			$("#horainiciodom").val("00").mask("00");
			$("#horafimdom").val("24").mask("00");

			$("#idsegunda").val("null"); 
			$("#horainicioseg").val("00").mask("00");
			$("#horafimseg").val("24").mask("00");
			
			$("#idterca").val("null"); 
			$("#horainicioter").val("00").mask("00");
			$("#horafimter").val("24").mask("00");

			$("#idquarta").val("null"); 
			$("#horainicioqua").val("00").mask("00");
			$("#horafimqua").val("24").mask("00");

			$("#idquinta").val("null"); 
			$("#horainicioqui").val("00").mask("00");
			$("#horafimqui").val("24").mask("00");

			$("#idsexta").val("null"); 
			$("#horainiciosex").val("00").mask("00");
			$("#horafimsex").val("24").mask("00");
			
			$("#idsabado").val("null"); 
			$("#horainiciosab").val("00").mask("00");
			$("#horafimsab").val("24").mask("00"); 
		}
   		function carregarperiodotrabalho( json )   {
   			
   			$.each(json, function(i, jsontrab) {
  		       	switch (jsontrab.diadasemana) { 
  		      	case 1:  
  		   			$('#iddomingo').val("null"); 
  		   			$('#horainiciodom').val(jsontrab.horainicio);
  		   			$('#horafimdom').val(jsontrab.horafim);
  				      break;
  		      	case 2:  
  		   			$('#idsegunda').val("null"); 
  		   			$('#horainicioseg').val(jsontrab.horainicio);
  		   			$('#horafimseg').val(jsontrab.horafim);
				      break;
  		      	case 3:  
  		   			$('#idterca').val("null"); 
  		   			$('#horainicioter').val(jsontrab.horainicio);
  		   			$('#horafimter').val(jsontrab.horafim);
				      break;
  		      	case 4:  
  		   			$('#idquarta').val("null"); 
  		   			$('#horainicioqua').val(jsontrab.horainicio);
  		   			$('#horafimqua').val(jsontrab.horafim);
				      break;
  		      	case 5:  
  		   			$('#idquinta').val("null"); 
  		   			$('#horainicioqui').val(jsontrab.horainicio);
  		   			$('#horafimqui').val(jsontrab.horafim);
				      break;
  		      	case 6:  
  		   			$('#idsexta').val("null"); 
  		   			$('#horainiciosex').val(jsontrab.horainicio);
  		   			$('#horafimsex').val(jsontrab.horafim);
				      break;
  		      	case 7:  
  		   			$('#idsabado').val("null"); 
  		   			$('#horainiciosab').val(jsontrab.horainicio);
  		   			$('#horafimsab').val(jsontrab.horafim); 
				      break;				      
  		      	default:

  		      	      break;
  		        }					
   		    });

			
   		}	
		