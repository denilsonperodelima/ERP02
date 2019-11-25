$(document.body).on('change',"#categoriamodal",function (e) {
	});
$('body').on('shown.bs.modal', '#categoriamodal', function (e) {
   e.preventDefault();  

    $('select:visible:enabled:first', this).focus();	

	$("#modalcategoriaprinc").val("SELECIONAR").change();
	
	$("#modalsubcategoria1").empty();
	$("#modalsubcategoria2").empty();
	$("#modalsubcategoria3").empty();
	$("#modalsubcategoria4").empty();

})

$(document).on("change", "#modalcategoriaprinc", function(e){	
	e.preventDefault();
	$("#modalsubcategoria1").empty(); 	
	$("#modalsubcategoria2").empty(); 
	$("#modalsubcategoria3").empty(); 
	$("#modalsubcategoria4").empty(); 	
	if ($("#modalcategoriaprinc option:selected").text() != ""){
		categoriacon("/grupo/" + sessionStorage.getItem("id") +  "/"  + $("#modalcategoriaprinc option:selected").text(), "carregarsub",'modalsubcategoria1','' )			
	}
});
$(document).on("change", "#modalsubcategoria1", function(e){	
	e.preventDefault();
	$("#modalsubcategoria2").empty(); 
	$("#modalsubcategoria3").empty(); 
	$("#modalsubcategoria4").empty(); 
	if ($("#modalsubcategoria1 option:selected").text() != ""){
		categoriacon("/grupo/" + sessionStorage.getItem("id") +  "/"  + $("#modalsubcategoria1 option:selected").text(), "carregarsub",'modalsubcategoria2','' )			
	}
});
$(document).on("change", "#modalsubcategoria2", function(e){	
	e.preventDefault();
	$("#modalsubcategoria3").empty(); 
	$("#modalsubcategoria4").empty(); 
	if ($("#modalsubcategoria2 option:selected").text() != ""){
		categoriacon("/grupo/" + sessionStorage.getItem("id") +  "/"  + $("#modalsubcategoria2 option:selected").text(), "carregarsub",'modalsubcategoria3','' )			
	}
});
$(document).on("change", "#modalsubcategoria3", function(e){	
	e.preventDefault();
	$("#modalsubcategoria4").empty(); 
	if ($("#modalsubcategoria3 option:selected").text() != ""){
		categoriacon("/grupo/" + sessionStorage.getItem("id") +  "/"  + $("#modalsubcategoria3 option:selected").text(), "carregarsub",'modalsubcategoria4','' )			
	}
});
//botao 
$(document).on("click", "#categoriasalvar", function(e){	
	e.preventDefault();

	if (consistircategorias() == false){
	    return;
	} 
	
	$("#categoria").val($("#modalcategoriaprinc option:selected").text());
	$("#subcategoria1").val($("#modalsubcategoria1 option:selected").text());
	$("#subcategoria2").val($("#modalsubcategoria2 option:selected").text());
	$("#subcategoria3").val($("#modalsubcategoria3 option:selected").text());
	$("#subcategoria4").val($("#modalsubcategoria4 option:selected").text());
	
	var json = serializeForm($("#linhacategoria :input"), true)
	json = json.replace("[","{")
	json = json.replace("]","}")
		
	categorialinhaimprimir($.parseJSON(json)) 
	
	$('#categoriadescartar').trigger('click');
    			
});
function consistircategorias(){
	
	if($("#modalcategoriaprinc option:selected").text() == "SELECIONAR"){
	    alert("Escolha uma opção"); 
	    $("#modalcategoriaprinc").focus();
	    return false;
	} 
	if($("#modalsubcategoria1 option:selected").text() == "SELECIONAR"){
	    alert("Escolha uma opção"); 
	    $("#modalsubcategoria1").focus()
	    return false;
	}		
	if($("#modalsubcategoria2 option:selected").text() == "SELECIONAR"){
	    alert("Escolha uma opção"); 
	    $("#modalsubcategoria2").focus()
	    return false;
	}		
	if($("#modalsubcategoria3 option:selected").text() == "SELECIONAR"){
	    alert("Escolha uma opção"); 
	    $("#modalsubcategoria3").focus()
	    return false;
	}	
	if($("#modalsubcategoria4 option:selected").text() == "SELECIONAR"){
	    alert("Escolha uma opção"); 
	    $("#modalsubcategoria4").focus()
	    return false;
	}		
}
function categorialinhaimprimir(json){
	
	var texto = "";
	
	if(json.categoria != ""){
	   texto += '<strong>Categoria: </strong>  ' + json.categoria	
	}
	if(json.subcategoria1 != ""){
		   texto += ">" + json.subcategoria1	
		}	
	if(json.subcategoria2 != ""){
		   texto += ">" + json.subcategoria2	
		}	
	if(json.subcategoria3 != ""){
		   texto += ">" + json.subcategoria3	
		}	
	if(json.subcategoria4 != ""){
		   texto += ">" + json.subcategoria4	
		}
	$("#categorialinha").html(texto)
    $('#categorialinha').css("color","blue");
}
function categoriacon(url, operacao, controle, campoinput) {

    $.ajax({
    	type: 'GET',
    	url: getAmbiente() + url ,
    	dataType:'json',
        async: false, 
        beforeSend : function (xhr){
        	xhr.setRequestHeader('Authorization', sessionStorage.getItem("arpz"))
        },
        success:function(response){ 
	       	switch (operacao) { 
	      	case "carregarsub": 
	      	      $("select[id='"+ controle +"']").empty();
	  		  	  $.each(response.subgrupos, function(i, item) {
	  		  		carregarComboSemValue($("select[id='"+ controle +"']"), JSON.stringify(item['subgrupoitens'])) 
	  	  		  	}) 	  	  		  	
	  	  		  	//$("select[id='"+ controle +"']").val( $("input[id='" + campoinput + "']").val() ).val().change();	
	  	  		  break;
	      	default:
	        	  alert("Metodo get no status success - operação não informada");	
	      	      break;
	        }	
        },
	        error:	function(request, status, error, response) {	
  		       	switch (request.status) { 
  		      	case 200: 
  	  		       	switch (operacao) { 
  	  	      	    case "carregarsub": 
  		        	  //alert("Grupo não cadastrado na base de dados " + url);	
  		      	      break;  	  	      	    	
  	  		      	default:	  	  		      		
  		        	    alert("Metodo get no status success - operação não informada - " + getAmbiente() + url + " operação " + operacao);	
  		      	        break;
  	  		        }
  		       	break;
  		      	case 403: 
  		        	alert("Usuário não autorizado para esta operação");		  		      		
  		      		break;
  		      	default:	
  	  		       	switch (operacao) { 
  	  		      	case "carregarsub":
  	  		      	case "xxxxxxxxxxxxxxxxx":
  	  		      	case "xxxxxxxxxxxxxxxxxxxx": 	  	  		      			  	  		      	
	  		        	 $('#msg').html( "Erro *** " + JSON.stringify(request.responseJSON));  
 		                 $('#msg').css("color","red");
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