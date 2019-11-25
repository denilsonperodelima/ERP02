$(document).on("click", "#adicionarbanco", function(e){
		e.preventDefault(); 
		switch($(this).closest('li').attr('id')) {
	    case "libanco":    
	    	
		    if (consistirlinhabanco() == false) {
			       return;	
			};  
			
			adicionarlinhabanco();
			 
		   	$("#linhabanco #codigobanco").focus();
				    	
	    	break;			    	
	    default:
		var id =   getdescricaofromli($('.lubanco :input'), $(this).closest("li").index(), "idbanco");     
		var nome = getdescricaofromli($('.lubanco :input'), $(this).closest("li").index(), "nomebanco");
		var conta = getdescricaofromli($('.lubanco :input'), $(this).closest("li").index(), "contabanco");
        var li = $(this).closest("li")
		Swal.fire({
			  title: 'Confirma exclusão do banco: ' + nome + "-" + conta,
			  text: "",
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#adad85',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Sim'
			}).then((result) => {
			  if (result.value) {
				if(id == "null"){li.remove()}else{deletarbanco(("/banco/delete/" + id), "", li)}  
			  }
			})	    	
		}			
  });   
function consistirlinhabanco() {
	
	if ($("#libanco #codigobanco").val() == "") {
	    alert("Código deve ser informado"); 	
        $("#libanco #codigobanco").focus();
		return false;
	}
	if ($("#libanco  #nomebanco").val() == "") {
	    alert("Nome deve ser informado"); 	
        $("#libanco #nomebanco").focus();
		return false;
	}

	if ($("#libanco #contabanco").val() == "") {
	    alert("Conta deve ser informada"); 	
        $("#libanco #contabanco").focus();
		return false;
	}					
}	
function deletarbanco(url, json, li) {
	
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
  		
function adicionarlinhabanco() {
	
    $("#linhabanco #spanadicionarbanco").removeClass("glyphicon glyphicon-plus").addClass("glyphicon glyphicon-trash")

	$('.lubanco').prepend("<li id='libancodinamico'><div class=row id='lidiv'> " + $("#linhabanco").html() + " </div></li>")
	$("#idbanco").val($("#linhabanco #idbanco").val());
	$("#codigobanco").val($("#linhabanco #codigobanco").val());    
	$("#nomebanco").val($("#linhabanco #nomebanco").val());
	$("#contabanco").val($("#linhabanco #contabanco").val());
	$("#obsbanco").val($("#linhabanco #obsbanco").val());
	
	$("#linhabanco #idbanco").val("null");
	$("#linhabanco #codigobanco").val("");
	$("#linhabanco #nomebanco").val("");
	$("#linhabanco #contabanco").val("");
	$("#linhabanco #obsbanco").val("");     		    	
	$("#linhabanco #spanadicionarbanco").removeClass("glyphicon glyphicon-trash").addClass("glyphicon glyphicon-plus")	
}