   		$("#pesqsubgrupo").click( function (e) {		
			e.preventDefault(); 
	        $('#msgcombo').html(""); 
	        if ($("#combogrupo option:selected").val() == "") {
	        	$("#combogrupo").focus();
               alert("Selecione um item");
               return
	        }	
	    	operacaoGET("/subgrupo/" + $("#combosubgrupo option:selected").val() , "carregarsubgrupositens")	
	    	
	    	$("#linhasubgrupoitens #descricaosubgrupoitens").focus();
  		});
   		
        
   		$("#combogrupo").change( function (e) {		
			e.preventDefault(); 
	        if ($("#combogrupo option:selected").val() != "") {
	      	    limparSubGruposItens();
				operacaoGET("/grupo/" + $("#combogrupo option:selected").val() , "carregarsubgrupos")
	        }
  		});

        
   		$("#combosubgrupo").change( function (e) {		
			e.preventDefault(); 
	      	    limparSubGruposItens();
  		});
   		
   		$("#gravarsubgrupo").click( function (e) {		
			e.preventDefault(); 
	        $('#msgcombo').html(""); 
	        
            if(consistirGravar() == false){return};
            
 			var grupo = '"' + "id" + '":' +  '"' +  $("#combogrupo option:selected").val() + '",'
			    grupo += '"' + "descricao" + '":' +  '"' +   $("#combogrupo option:selected").text() + '",'
			    grupo += '"' + "idempresa" + '":' +  '"' +   sessionStorage.getItem("id") + '"'
			    
			var subgrupo = ',"' + "subgrupos" + '":' + "[{"
 			    subgrupo += '"' + "id" + '":' +  '"' +  $("#combosubgrupo option:selected").val() + '",'
 			    subgrupo += '"' + "descricao" + '":' +  '"' +   $("#combosubgrupo option:selected").text() + '",'			
			
			var subgrupoitens = '"' + "subgrupoitens" + '":' + "["
		    	subgrupoitens += serializeFormOccurs($(".lisubgrupoitensdinamico :input"),4)
	            subgrupoitens +=  "]}" ;	 
		 
		    json = "{"
		    json += grupo + subgrupo + subgrupoitens
		    json += "]}"		   
	
		   	//alert ("json " + json )
			
			operacaoPOST("/grupo/", json, "gravargrupo")
	    	   
  		});
   		
 //--  	
     $(document).on("click", "#adicionarsubgrupoitens", function(e){
  			e.preventDefault(); 

  			//alert("xx " + $(this).closest('li').attr('class'))
  			switch($(this).closest('li').attr('class')) {
  		    case "lisubgrupoitens":      
   		    	
	   			    if (consistirlinhaSubgrupoItens() == false) {
					       return;	
					}  

	   			    adicionarsubgrupoitem();

   		    	    $('#msgcombo').html(""); 
   		    	    
     	 		   	$("#linhasubgrupoitens #descricaosubgrupoitens").focus();
   		    	
   		    	break;	
   		    default: 
   		    	
   				var id =   getdescricaofromli($('.ulsubgrupoitens :input'), $(this).closest("li").index(), "idsubgrupoitens");     
   				var descricao = getdescricaofromli($('.ulsubgrupoitens :input'), $(this).closest("li").index(), "descricaosubgrupoitens");
   		        var li = $(this).closest("li")
   		        
   				Swal.fire({
   				  title: 'Confirma exclusão do item: ' + descricao,
   				  text: "",
   				  type: 'warning',
   				  showCancelButton: true,
   				  confirmButtonColor: '#adad85',
   				  cancelButtonColor: '#d33',
   				  confirmButtonText: 'Sim'
   				}).then((result) => {
   				  if (result.value) {
   					if(id == "null"){li.remove()}else{deletarsubgrupoitem(("/subgrupoitem/delete/" + id), "", li)}  
   				  }
   				})	    	
   			   		        
		    	
   			}
      });   	 
//----------------------------------------------------------------------------------------
	  $('#modalcontatoitens').on('shown.bs.modal', function (e) {
   		e.preventDefault();   
   	    $('#tipocontatoitens').focus();
     })	
//----------------------------------------------------------------------------------------  
  	function limparSubGrupos(){
        $('#msgcombo').html(""); 		  
		$('#combosubgrupo')[0].options.length = 0;;		  
	}
  	function limparSubGruposItens(){
          $('#msgcombo').html(""); 		   
		   $('.ulsubgrupoitens .lisubgrupoitensdinamico').each(function(index, element) {
			   element.remove();
	    	});
		   		  	  
	}	  	

	function consistirlinhaSubgrupoItens() {
		
		if ($(".lisubgrupoitens #descricaosubgrupoitens").val() == "") {
		    alert("Descrição do item deve ser informado"); 	
	        $(".lisubgrupoitens #descricaosubgrupoitens").focus();
			return false;
		}			
	}

	function consistirGravar() {
		
        if ($(".ulsubgrupoitens li").length == 1) {
        	alert("Inclua ao menos 1 item")
        	return false;
        }
		
        if ($("#combogrupo option:selected").val() == "") {
        	$("#combogrupo").focus();
           alert("Selecione um item");
           return false;
        }	
		
	}
	
	function carregarSubGrupos(json){

        var listitems = '';
	    $.each(json.subgrupos, function(i, item) {

			  listitems += '<option value=' + item.id + '>' + item.descricao + '</option>';

		 }); 	    

		  $("#combosubgrupo").append(listitems);
	}	
	function carregarSubGruposItens(json){

	    $.each(json.subgrupoitens, function(i, item) {

	    	    if(item.dtexclui == null){
		  			$("#linhasubgrupoitens #idsubgrupoitens").val(item.id);
	 	  			$("#linhasubgrupoitens #descricaosubgrupoitens").val(item.descricao);

	 	  			$("#linhasubgrupoitens #dtexcluisubgrupoitens").val(item.dtexclui);
	 	  			
	 	  			adicionarsubgrupoitem();
	    	    }



		 }); 	    

	}		
	function deletarsubgrupoitem(url, json, li) {
		
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
function adicionarsubgrupoitem() {
	
		    if ($("#linhasubgrupoitens #idsubgrupoitens").val() != "null"){
				$("#linhasubgrupoitens #descricaosubgrupoitens").attr('disabled', true);    	  				
			} 

   	        $("#linhasubgrupoitens #spanadicionarsubgrupoitens").removeClass("glyphicon glyphicon-plus").addClass("glyphicon glyphicon-trash")
   	
			$('.ulsubgrupoitens').prepend("<li class='lisubgrupoitensdinamico'><div class=row id='linhasubgrupoitensdinamica'> " + $("#linhasubgrupoitens").html() + " </div></li>")
			
			$("#idsubgrupoitens").val($("#linhasubgrupoitens #idsubgrupoitens").val());
			$("#descricaosubgrupoitens").val($("#linhasubgrupoitens #descricaosubgrupoitens").val().toUpperCase());
			
			$("#dtexcluisubgrupoitens").val($("#linhasubgrupoitens #dtexcluisubgrupoitens").val());

			$("#adicionarsubgrupoitens").attr("nomesv", $("#linhasubgrupoitens #descricaosubgrupoitens").val())
			
			$("#linhasubgrupoitens #idsubgrupoitens").val("null");  
			$("#linhasubgrupoitens #dtexcluisubgrupoitens").val("");       	  			
			$("#linhasubgrupoitens #descricaosubgrupoitens").val("");
			
			$("#linhasubgrupoitens #descricaosubgrupoitens").attr('disabled', false); 

   	       	$("#linhasubgrupoitens #spanadicionarsubgrupoitens").removeClass("glyphicon glyphicon-trash").addClass("glyphicon glyphicon-plus")
}
       