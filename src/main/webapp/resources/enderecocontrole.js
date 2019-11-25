$(document).on("click", "#adicionarendereco", function(e){
		e.preventDefault(); 
		switch($(this).closest('li').attr('id')) {
	    case "liendereco":    
	    	
		    if (consistirlinhaEndereco() == false) {
			       return;	
			};  
			
			adicionarlinhaendereco();
			 
		   	$("#linhaendereco #tipoendereco").focus();
				    	
	    	break;			    	
	    default:
		var id =   getdescricaofromli($('.luendereco :input'), $(this).closest("li").index(), "idendereco");     
		var tipo = getdescricaofromli($('.luendereco :input'), $(this).closest("li").index(), "tipoendereco");
		var descricao = getdescricaofromli($('.luendereco :input'), $(this).closest("li").index(), "logradouro");
        var li = $(this).closest("li")
		Swal.fire({
			  title: 'Confirma exclusão do endereço: ' + tipo + "-" + descricao,
			  text: "",
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#adad85',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Sim'
			}).then((result) => {
			  if (result.value) {
				if(id == "null"){li.remove()}else{deletarendereco(("/endereco/delete/" + id), "", li)}  
			  }
			})	    	
		}			
      });   
function consistirlinhaEndereco() {
	
	if ($("#liendereco #tipoendereco").val() == "") {
	    alert("Escolha um tipo de endereco"); 	
        $("#liendereco #tipopessoa").focus();
		return false;
	}
	
	if ($("#liendereco #logradouro").val() == "") {
	    alert("Endereço deve ser informado"); 	
        $("#liendereco #logradouro").focus();
		return false;
	}
	if ($("#liendereco  #cep").val() == "") {
	    alert("Cep deve ser informado"); 	
        $("#liendereco #cep").focus();
		return false;
	}

	if ($("#liendereco #cidade").val() == "") {
	    alert("Cidade deve ser informado"); 	
        $("#liendereco #cidade").focus();
		return false;
	}	
	if ($("#liendereco #uf").val() == "") {
	    alert("UF deve ser informado"); 	
		return false;
	}					
}	
function deletarendereco(url, json, li) {
	
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
  		
function adicionarlinhaendereco() {
	
    $("#linhaendereco #spanadicionarendereco").removeClass("glyphicon glyphicon-plus").addClass("glyphicon glyphicon-trash")

	$('.luendereco').prepend("<li id='lienderecodinamico'><div class=row id='lidiv'> " + $("#linhaendereco").html() + " </div></li>")
	$("#logradouro").val($("#linhaendereco #logradouro").val());
	$("#idendereco").val($("#linhaendereco #idendereco").val());
	$("#tipo").text($("#linhaendereco #tipo").text());
	$("#bairro").val($("#linhaendereco #bairro").val());
	$("#cep").val($("#linhaendereco #cep").val());
	$("#cidade").val($("#linhaendereco #cidade").val());
	$("#uf").val($("#linhaendereco #uf").val()); 
	
	$("#linhaendereco #idendereco").val("null");
	$("#linhaendereco #logradouro").val("");
	$("#linhaendereco #tipo").val("");
	$("#linhaendereco #bairro").val("");
	$("#linhaendereco #cep").val("");
	$("#linhaendereco #cidade").val("");
	$("#linhaendereco #uf").val("");      		    	
	$("#linhaendereco #spanadicionarendereco").removeClass("glyphicon glyphicon-trash").addClass("glyphicon glyphicon-plus")
	
}