$(document).on("click", "#novocontato", function(e){
	e.preventDefault();
	
    $(this).closest('li').attr("id","licontatodinamicoedita")  
    
    $("#modalnomecontato").val("")
	$("#modalidcontato").val("null")
	$("#modalcontexto").val($(this).attr("id"))
    
    $('#modalcontatocadastrar').modal('toggle');
    
});

$(document).on("click", "#editarcontato", function(e){
	e.preventDefault();
	
    $(this).closest('li').attr("id","licontatodinamicoedita") 

    $("#modalnomecontato").val($("li[id='"+ $(this).closest('li').attr('id') +"']  .accordion").html())
	$("#modaltipocontato").val($("li[id='"+ $(this).closest('li').attr('id') +"']  #tipocontato").val()).change()
	$("#modalidcontato").val($("li[id='"+ $(this).closest('li').attr('id') +"']  #idcontato").val())
	$("#modalcontexto").val($(this).closest('li').attr("id"))
    
    $('#modalcontatocadastrar').modal('toggle');
    
});  
$(document).on("click", "#salvarcontato", function(e){
	e.preventDefault();
	
	if ($("#modalcontexto").val() == "novocontato") {

		$('.ulcontatodinamico').prepend("<li id='licontatodinamicoinclui' style='margin-top: -4%;'> <div class='row' id='linhacontatodinamico'> " + formatahtmllicontato($("#modalnomecontato").val()) + " </div></li>");	   	 

	    $("#tipocontato").val($("#modaltipocontato option:selected").text());
	    $("#idcontato").val("null");

		 $('.ulcontatodinamico #licontatodinamicoinclui .ulcontatoitens').each(function(index) {
			 
			    $(this).prepend("<li id='licontatoitensdigita'> <div class='row' id='linhacontatoitensdigita'> " + formatahtmllicontatoitem() + " </div></li>");		    
			   	$("#linhacontatoitensdigita #spanadicionarcontatoitens").removeClass("glyphicon glyphicon-trash").addClass("glyphicon glyphicon-plus")			   	
			   	$('#tipocontatoitens').html($('#tipocontatoitensaux').html());
		        $("#licontatoitensdigita #idcontatoitens").val("null");
		 });
		 
	    $("#licontatodinamicoinclui").attr("id","licontatodinamico");
	    
	} else {	
		$("li[id='"+ $("#modalcontexto").val() +"']  #tipocontato").val($("#modaltipocontato option:selected").text())
		$("li[id='"+ $("#modalcontexto").val() +"']  .accordion").html($("#modalnomecontato").val())
		
		$("li[id='"+ $("#modalcontexto").val() +"']").attr("id","licontatodinamico")
	}
    
}); 
$(document).on("click", "#descartarcontato", function(e){
	e.preventDefault();

	$("li[id='"+ $("#modalcontexto").val() +"']").attr("id","licontatodinamico")
    
});
$('body').on('shown.bs.modal', '#modalcontatocadastrar', function (e) {
    e.preventDefault();
	//$('input:visible:enabled:first', this).focus();
	//$("#modaltipocontato option:selected").text();
	$('select:visible:enabled:first', this).focus();	
})

$(document).on("click", "#deletarcontato", function(e){
	e.preventDefault();
	
    $(this).closest('li').attr("id","licontatodinamicodeleta")  
	
	var id = $("li[id='"+ $(this).closest('li').attr('id') +"']  #idcontato").val() 
	var li = $(this).closest('li');


	Swal.fire({
	  title: 'Confirma exclusão do contato: ' +  $("li[id='"+ $(this).closest('li').attr('id') +"']  .accordion").html(),
	  text: "",
	  type: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#adad85',
	  cancelButtonColor: '#d33',
	  confirmButtonText: 'Sim'
	}).then((result) => {
	  if (result.value) {
		if(id == "null"){li.remove()}else{deletarcontato(("/contato/delete/" + id), "", li)}  
		   limparcontatoitens();
	  }
	})	
    			
    $(this).closest('li').attr("id","licontatodinamico")  
    
}); 
  
$(document).on("click", "#adicionarcontatoitens", function(e){
	e.preventDefault(); 
	e.stopPropagation();

	switch($(this).closest('li').attr('id')) {
    case "licontatoitensdigita":   
    	    	
		    if (consistirlinhacontatoitens($(this)) == false) {
			       return;	
			} 
	  	
		    $(this).closest('li').before("<li id='licontatoitensatual'  > <div class='row' id='linhacontatoitens'> " + formatahtmllicontatoitem() + " </div></li>");		    

		    $(this).closest('li').attr("id","licontatoitensdigitaatual")   

		   	$('#licontatoitensatual #tipocontatoitens').html($('#tipocontatoitensaux').html());	//copia combo		    	 	    
		    $("#licontatoitensatual #idcontatoitens").val($("#licontatoitensdigitaatual #idcontatoitens").val());  
	   	    $("#licontatoitensatual #tipocontatoitens option:selected").text($("#licontatoitensdigitaatual #tipocontatoitens option:selected").text());
	   	    $("#licontatoitensatual #descricaocontatoitens").val($("#licontatoitensdigitaatual #descricaocontatoitens").val()); 
	        $("#licontatoitensatual #linhacontatoitens #spanadicionarcontatoitens").removeClass("glyphicon glyphicon-plus").addClass("glyphicon glyphicon-trash")
	    
	        $("#licontatoitensdigitaatual #idcontatoitens").val("null");
	        $("#licontatoitensdigitaatual #descricaocontatoitens").val("");	
	        $("#licontatoitensdigitaatual #tipocontatoitens").focus()
	        
		   	$('#licontatoitensatual').attr("id","licontatoitens")
		   	
		   	$(this).closest('ul').removeClass("ulcontatoitens").addClass("ulcontatoitenspreenchido") //forçando para não carregar na próxima
		   	
		    $("#licontatoitensdigitaatual").attr("id","licontatoitensdigita")   
	        
    	break;			    	
	    default:
	    	
		    $(this).closest("ul").removeClass("ulcontatoitenspreenchido").addClass("ulcontatoitenspreenchidodelete")
	  
			var id =   getdescricaofromli($('.ulcontatoitenspreenchidodelete :input'), $(this).closest("li").index(), "idcontatoitens");     
    		var tipo = getdescricaofromli($('.ulcontatoitenspreenchidodelete :input'), $(this).closest("li").index(), "tipocontatoitens");
    		var descricao = getdescricaofromli($('.ulcontatoitenspreenchidodelete :input'), $(this).closest("li").index(), "descricaocontatoitens");
	        var li = $(this).closest("li")

   		    $(this).closest("ul").removeClass("ulcontatoitenspreenchidodelete").addClass("ulcontatoitenspreenchido")

    		Swal.fire({
    			  title: 'Confirma exclusão do meio de contato: ' + descricao,
    			  text: "",
    			  type: 'warning',
    			  showCancelButton: true,
    			  confirmButtonColor: '#adad85',
    			  cancelButtonColor: '#d33',
    			  confirmButtonText: 'Sim'
    			}).then((result) => {
    			  if (result.value) {
    				if(id == "null"){li.remove()}else{deletarcontato(("/contatotipo/delete/" + id), "", li)}  
    			  }
    			})
		}
  });   	
//----------------------------------------------------------------------------------------
 $(document).on("click", ".accordion", function(e){
	e.preventDefault();
 	    //alert("CLICK ACCORDION")
	    this.classList.toggle("active");
	    var panel = this.nextElementSibling;
	    if (panel.style.maxHeight) {
	      panel.style.maxHeight = null;
	    } else {
	      panel.style.maxHeight = panel.scrollHeight + 10000 + "px";
	    } 	 	
 });  
//----------------------------------------------------------------------------------------   
 $(document).on("click", "#editarcontato", function(e){
 	e.preventDefault();
 	
 	$('#licontatodinamico').prepend($('#licontato').html()); 	
 });   
//----------------------------------------------------------------------------------------   
$(document).on("click", "#descartarcontatoitens", function(e){
	e.preventDefault();
	
	   limparcontatoitens();	
		    		    
});
//-------modal----------------------------------------------------------------------------- 

$('body').on('shown.bs.modal', '#modalsimnao', function (e) {
e.preventDefault();	
})
function consistirlinhaContato() {
	
	if ($("#licontato #tipocontato").val() == "") {
	    alert("Escolha um tipo de contato"); 	
        $("#licontato #tipocontato").focus();
		return false;
	}
	
	if ($("#licontato #nomecontato").val() == "") {
	    alert("Nome do contato deve ser informado"); 	
        $("#licontato #nomecontato").focus();
		return false;
	}			
}  		
function consistirlinhacontatoitens(contexto) {
		  
	var mensa = "";
	
	contexto.closest('li').attr("id","licontatoitensdigitaconsiste")  
	
    if($("#licontatoitensdigitaconsiste  #descricaocontatoitens").val() == ""){
		   mensa = "Descrição do item do contato deve ser informado";  
		   $("#licontatoitensdigitaconsiste #descricaocontatoitens").focus();  
    }

    if($("#licontatoitensdigitaconsiste #tipocontatoitens").text() == ""){
		   mensa = "Escolha um tipo de contato";  
		   $("#licontatoitensdigitaconsiste #tipocontatoitens").focus();
    }
	contexto.closest('li').attr("id","licontatoitensdigita")  
	
	if(mensa == ""){  return true } else {
		alert(mensa);
		return false
	}
  			
}

function limparcontatoitens() {	   
    $('.ulcontatoitens #licontatoitensdinamico').each(function(index, element) {
		   element.remove();
 	});	   		
}
function limparcontatos(){
	 $('.ulcontatodinamico #licontatodinamico').each(function(index) {
		 $(this).remove();
	 });
}
function carregarcontatos(json) {

	limparcontatos();
	
    $.each(json.contatos, function(i, item) {
	  	
	   	 $('.ulcontatodinamico').prepend("<li id='licontatodinamico' style='margin-top: -4%;'> <div class='row' id='linhacontatodinamico'> " + formatahtmllicontato(item.nome) + " </div></li>");	   	 
	   	 $("#tipocontato").val(item.tipo);
	   	 $("#idcontato").val(item.id);	   	
		   	
		 $('.ulcontatodinamico #linhacontatodinamico .ulcontatoitens').each(function(index) {
			 
		    $(this).prepend("<li id='licontatoitensdigita'> <div class='row' id='linhacontatoitensdigita'> " + formatahtmllicontatoitem() + " </div></li>");	
		    
		   	$("#licontatoitensdigita #spanadicionarcontatoitens").removeClass().addClass("glyphicon glyphicon-plus")			   	
		   	$('#tipocontatoitens').html($('#tipocontatoitensaux').html());
	        $("#licontatoitensdigita #idcontatoitens").val("null");
		    
		   	$('#tipocontatoitens').attr("id","tipocontatoitens")
		   	
		    var contatostipo = item['contatostipo']
			for (i=0; i < contatostipo.length ; i++) {
			    $(this).prepend("<li id='licontatoitens'  > <div class='row' id='linhacontatoitens'> " + formatahtmllicontatoitem() + " </div></li>");		
			   	$('#tipocontatoitens').html($('#tipocontatoitensaux').html());	//copia combo	 	    
			    $("#idcontatoitens").val(contatostipo[i].id);  
		   	    $("#tipocontatoitens option:selected").text(contatostipo[i].tipo);
		   	    $("#descricaocontatoitens").val(contatostipo[i].descricao); 
		        $("#licontatoitens #spanadicionarcontatoitens").removeClass().addClass("glyphicon glyphicon-trash")
			}

		   	$(this).removeClass("ulcontatoitens").addClass("ulcontatoitenspreenchido") //forçando para não carregar na próxima
		   		
		  })	
	 }); 

}
function formatahtmllicontatoitem() {
	 var licontatoitem = '';
  	licontatoitem += '<div class=row id="linhacontatoitens" style="margin-top: 1%" >';	
  	licontatoitem += '<div class="col-xs-1">';	
  	licontatoitem += '<input type="text" class="form-control" id="idcontatoitens" style="border-radius: 2px ; height: 90%"  name="id" disabled>';		  	
  	licontatoitem += '</div>';    		
  	licontatoitem += '<div class="col-xs-3" id="tipcontatoitensorow">';
  	licontatoitem += '<select class="form-control" id="tipocontatoitens" style="border-radius: 2px ; height: 90%"  name="tipo" ></select>';
  	licontatoitem += '</div>';
  	licontatoitem += '<div class="col-xs-6" id="descricaocontatoitensrow">';   
  	licontatoitem += '<input type="text" class="form-control"  style="border-radius: 2px ; height: 90%" id="descricaocontatoitens" name="descricao" >'; 	
  	licontatoitem += '</div>';	  	
  	licontatoitem += '<div class="col-xs-1">'; 	  	
  	licontatoitem += '<button class="btn" id="adicionarcontatoitens">'; 
  	licontatoitem += '<span id="spanadicionarcontatoitens" class="glyphicon glyphicon-plus"></span>'; 	  	
  	licontatoitem += '</button>'; 	
  	licontatoitem += '</div>';
  	licontatoitem += '</div>';
  	return licontatoitem;
}
function formatahtmllicontato(nome) {
 	 var ulcontatoitem = '';
     ulcontatoitem += '<ul class="ulcontatoitens" style="list-style: none;" > </ul>';	  

//------------------------------------------------------   	
  	 var licontato = '';	    	 
  	 licontato += '<div class="col-xs-1">';	  	 
  	 licontato += '<button class="btn" id ="deletarcontato" style="border-radius: 2px; height: 10%"><span class="glyphicon glyphicon-trash"></span></button>';	  	 
  	 licontato += '</div>';	 	  	 
  	 licontato += '<div class="col-xs-1">';	
  	 licontato += '<button class="btn" id="editarcontato" style="border-radius: 2px ; height: 90%"><span class="glyphicon glyphicon-pencil"></span></button>';	          	
  	 licontato += '</div>';	       
  	 licontato += '<div class="col-xs-1">';	
  	 licontato += '<input type="text" class="form-control" style="border-radius: 2px; height: 90%;" id="idcontato" name="id" disabled> ';	          	
  	 licontato += '</div>';	           	                                
  	 licontato += '<div class="col-xs-3">';	
  	 licontato += '<input type="text" style="border-radius: 2px; height: 90%;" class="form-control" id="tipocontato" name="tipo" disabled>';	
  	 licontato += '</div>';	

  	 licontato += '<button class="accordion" >' + nome  + '</button>';
  	 licontato += '<div class="panel">';	
  	 licontato += ulcontatoitem;
  	 licontato += '</div>';	
  	 
  	 return licontato;
}
function gerajson() {
	
	var contatos = ',"'  + "contatos" + '"' +  ':[';

	 $('.ulcontatodinamico #licontatodinamico').each(function(index) {
		 
			$(this).attr("id","licontatodinamicojson") 
		
		   	$("#idcontatoauxiliar").val($("li[id='"+ $(this).attr('id') +"']  #idcontato").val())
				$("#tipocontatoauxiliar").val($("li[id='"+ $(this).attr('id') +"']  #tipocontato").val())    	
			    $("#nomecontatoauxiliar").val($("li[id='"+ $(this).attr('id') +"']  .accordion").html())
				
				var contaux = serializeForm($("#contatoauxiliar :input"), true);
				contaux = contaux.replace("[","{")
			    contaux = contaux.replace("]","")
			    
			    contatos += contaux
		
				var contatoitens = ',"'  + "contatostipo" + '"' +  ':[';
				
				 $('.ulcontatodinamico #licontatodinamicojson .ulcontatoitenspreenchido #licontatoitens').each(function(index) {
					 
					$(this).attr("id","licontatoitensjson") 
		
					$("#idcontatoauxiliar").val($("li[id='"+ $(this).attr('id') +"']  #idcontatoitens").val())
					$("#tipocontatoauxiliar").val($("li[id='"+ $(this).attr('id') +"']  #tipocontatoitens option:selected").text())    	
				    $("#nomecontatoauxiliar").val($("li[id='"+ $(this).attr('id') +"']  #descricaocontatoitens").val())  
					
					cont = serializeForm($("#contatoauxiliar :input"), true);
					cont = cont.replace("nome","descricao")
				    cont = cont.replace("[","{")
				    cont = cont.replace("]","},")	
					
					contatoitens += cont;
					
					$(this).attr("id","licontatoitens") 
					 
				 });
		
		 contatoitens += "]},"
		 contatoitens = contatoitens.replace("},]","}]")
		 
		 contatos += contatoitens	
			
		 $(this).attr("id","licontatodinamico") 

	 });
	 contatos += "]"
	 contatos = contatos.replace("],]","]]")	 
	 contatos = contatos.replace("},]","}]")
	 
	 return contatos;
}
function deletarcontato(url, json, li) {
	
	$.ajax({
	  	type: 'POST',
    	url: getAmbiente() + url,
    	contentType: 'application/json;charset=utf-8',
    	method: 'POST',
	cache: false,
        data: json, 
    beforeSend : function (xhr){
    	xhr.setRequestHeader('Authorization', sessionStorage.getItem("arpz"))
    },
    success:function(response){  
    	li.remove();
    },
        error:	function(request, status, error) {	
		       	switch (request.status) {	  		       	
		      	case 403: 
		        	alert("Usuário não autorizado para esta operação");		  		      		
		      		break;
		      	default:	
		            alert( "Erro *** " + JSON.stringify(request.responseJSON));		  	  		      		
	  		        break;
	  		        }
		        }		  		        		  		      				            
});		
}