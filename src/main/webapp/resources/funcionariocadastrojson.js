
function getformulario() {

	funcionario = '"id": ' + $("#idpessoa").val()  + '';
	funcionario += ',"nome": ' +  '"' +  $("#nome").val() + '"';
	funcionario += ',"documento": ' +  '"' +  $("#cpfoucnpj").val() + '"';
	funcionario += ',"tipopessoa": ' +  '"' +  "FISICA" + '"';
	funcionario += ',"empresaid": ' +  '"' +  sessionStorage.getItem("id") + '"';	
	funcionario += ',' 
	funcionario += serializeForm($("#cadastro :input"), true);
    funcionario = funcionario.replace("[","").replace("]","");
    
    empresa = ',"' + 'empresa' + '"' + ":" + getEmpresa(); 
    
    pertrab = '  ,';
   	pertrab += '"' + 'usuarioperiodosdetrabalho' +'"' + ": [" ;    	
	pertrab +=  serializeFormOccurs($("#fsperiodotrabalho :input"), 4);
    pertrab += '  ]';

    arpz = serializeForm($("#periodoeventual :input"), true);
    arpz = arpz.replace("[","").replace("]","");
    
	periodoeventual = '  ,';
	periodoeventual += '"' + 'usuarioperiodoeventual' +'"' + ": [{" ;    
	periodoeventual += arpz
	periodoeventual += '  }]';

    arpz = serializeForm($("#periodosuspenso :input"), true);
    arpz = arpz.replace("[","").replace("]","");
    
	periodosuspenso = '  ,';
	periodosuspenso += '"' + 'usuarioperiodosuspenso' +'"' + ": [{" ;    
	periodosuspenso += arpz
	periodosuspenso += '  }]';

	var bancos =  ',"' + 'bancos' +'"' + ":[" ; 
	bancos += serializeFormOccurs($("#banco :input"),6)
	bancos += "]" 
		
	var enderecos =  ',"' + 'enderecos' +'"' + ":[" ; 
	enderecos += serializeFormOccurs($("#endereço :input"),8)
	enderecos += "]"     
		
    var contatos = gerajson() //contatocontrole
	
	json  = '{ "@type":"funcionario"' + ",";	
	json += funcionario;
	json += empresa;
	json += bancos;	
	json += enderecos;	
	json += contatos;		
	json += pertrab;
	json += periodoeventual;
	json += periodosuspenso;	
	json += "}";	

	return json;
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
  		   			$('#iddomingo').val(jsontrab.id); 
  		   			$('#horainiciodom').val(jsontrab.horainicio);
  		   			$('#horafimdom').val(jsontrab.horafim);
  				      break;
  		      	case 2:  
  		   			$('#idsegunda').val(jsontrab.id); 
  		   			$('#horainicioseg').val(jsontrab.horainicio);
  		   			$('#horafimseg').val(jsontrab.horafim);
				      break;
  		      	case 3:  
  		   			$('#idterca').val(jsontrab.id); 
  		   			$('#horainicioter').val(jsontrab.horainicio);
  		   			$('#horafimter').val(jsontrab.horafim);
				      break;
  		      	case 4:  
  		   			$('#idquarta').val(jsontrab.id); 
  		   			$('#horainicioqua').val(jsontrab.horainicio);
  		   			$('#horafimqua').val(jsontrab.horafim);
				      break;
  		      	case 5:  
  		   			$('#idquinta').val(jsontrab.id); 
  		   			$('#horainicioqui').val(jsontrab.horainicio);
  		   			$('#horafimqui').val(jsontrab.horafim);
				      break;
  		      	case 6:  
  		   			$('#idsexta').val(jsontrab.id); 
  		   			$('#horainiciosex').val(jsontrab.horainicio);
  		   			$('#horafimsex').val(jsontrab.horafim);
				      break;
  		      	case 7:  
  		   			$('#idsabado').val(jsontrab.id); 
  		   			$('#horainiciosab').val(jsontrab.horainicio);
  		   			$('#horafimsab').val(jsontrab.horafim); 
				      break;				      
  		      	default:

  		      	      break;
  		        }					
   		    });

			
   		}	
