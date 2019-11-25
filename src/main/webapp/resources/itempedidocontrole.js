$(document).on("click", "#adicionaritempedido", function(e){
		e.preventDefault(); 
		switch($(this).closest('li').attr('id')) {
	    case "liitempedido":    
	    	
		    if (consistirlinhaitempedido() == false) {
			       return;	
			};  
			
			adicionarlinhaitempedido();
			 
		   	$("#linhaitempedido #nomeproduto").focus();

			calculartotaispedido();
			
	    	break;			    	
	    default:
		var id =   getdescricaofromli($('.luitempedido :input'), $(this).closest("li").index(), "idpedidoitem");     
		var descricao = getdescricaofromli($('.luitempedido :input'), $(this).closest("li").index(), "nomeproduto");
        var li = $(this).closest("li")
		Swal.fire({
			  title: 'Confirma exclusão do produto: '   + descricao,
			  text: "",
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#adad85',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Sim'
			}).then((result) => {
			  if (result.value) {
				if(id == "null"){
					li.remove()
					calculartotaispedido();
					}else{
						deletaritempedido(("/itempedido/delete/" + id), "", li)
						}
			  }
			})	    	
		}			
  }); 
//lostfocus quantidade 		
$(document).on("blur", "#liitempedido #quantidade", function(e){
	e.preventDefault();
	
	calculartotallinhapedido();
	
});

$(document).on("blur", "#liitempedido #nomeproduto", function(e){
	e.preventDefault();
	
	//$("#liitempedido #quantidade").focus();
	
});

function consistirlinhaitempedido() {
	
	if ($("#liitempedido #nomeproduto").val() == "") {
	    alert("Nome produto deve ser informado"); 	
        $("#liitempedido #nomeproduto").focus();
		return false;
	}
	if ($("#liitempedido  #quantidade").val() == "") {
	    alert("Quantidade de produtos deve ser informado"); 	
        $("#liitempedido #quantidade").focus();
		return false;
	}

}	
function deletaritempedido(url, json, li) {
	
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
        	calculartotaispedido();
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
		
function adicionarlinhaitempedido() {
	
    $("#linhaitempedido #spanadicionaritempedido").removeClass("glyphicon glyphicon-plus").addClass("glyphicon glyphicon-trash")

	$('.luitempedido').prepend("<li id='liitempedidodinamico'><div class=row id='lidiv'> " + $("#linhaitempedido").html() + " </div></li>")
	$("#idpedidoitem").val($("#linhaitempedido #idpedidoitem").val());
	$("#idproduto").val($("#linhaitempedido #idproduto").val());    
	$("#nomeproduto").val($("#linhaitempedido #nomeproduto").val());
	$("#unidade").val($("#linhaitempedido #unidade").val());
	$("#quantidade").val($("#linhaitempedido #quantidade").val());
	$("#preco").val($("#linhaitempedido #preco").val());
	$("#valortotal").val($("#linhaitempedido #valortotal").val()); 
	
	$("#nomeproduto").attr("disabled", true);
	$("#quantidade").attr("disabled", true);
	
	$("#linhaitempedido #idpedidoitem").val("null");
	$("#linhaitempedido #idproduto").val("null");	
	$("#linhaitempedido #nomeproduto").val("");
	$("#linhaitempedido #unidade").val("");
	$("#linhaitempedido #quantidade").val("");
	$("#linhaitempedido #preco").val("");
	$("#linhaitempedido #valortotal").val("");      		    	
	$("#linhaitempedido #spanadicionaritempedido").removeClass("glyphicon glyphicon-trash").addClass("glyphicon glyphicon-plus")
	$("#linhaitempedido #nomeproduto").focus();
	
}
function carregarprodutosautocomplete(json) {

	 var dados = {};
	 var array = [];
	 var obj = {};
	   
	 for (i=0; i < json.length ; i++) {	
			
		 array.push({'label' : json[i].nome + " [" + json[i].unidade + "]",   'value': json[i].id, 'unidade': json[i].unidade, 'preco': json[i].valorvenda});			 
   }

	 //alert("Lista +arraynnn=  " + array + " Dadosyyy " + dadosyyy);
  		     
    $("#nomeproduto").autocomplete({
    	
    	source: array,
     	autoFocus: false,
        minLength:0,

        select: function(event, ui) { 
            var newString = ui.item.label.substring(0, ui.item.label.indexOf( "[" ) );
            $( "#linhaitempedido #nomeproduto" ).val(newString);  
            $( "#linhaitempedido #idproduto" ).val(ui.item.value);
            $( "#linhaitempedido #unidade" ).val(ui.item.unidade);
            $( "#linhaitempedido #preco" ).val(ui.item.preco.toFixed(2));
            return false;  
        }
    
    });
}
function calculartotallinhapedido() {
	var valor = 0;
	
	//var preco = parseFloat (( apenasNumeros($("#liitempedido #preco").val()))/100 );
	
	if($("#liitempedido #quantidade").val() != "" && $("#liitempedido #preco").val() != ""){;
		valor = $("#liitempedido #quantidade").val() * $("#liitempedido #preco").val();
		$("#liitempedido #valortotal").val(valor.toFixed(2));				
	}
	
}
function calculartotaispedido(){

    var totalItens = 0;
    var totalValor = 0;
    var valor = 0;

    $('.luitempedido #liitempedidodinamico').each(function() {  		
	        $(this).find("input").each(function(){
	        	if($(this).attr("name") == "valortotal" &&  $(this).val() != ""){	        		
	        		//valor = apenasNumeros($(this).val());
	        		totalValor += parseFloat($(this).val());	
	        		totalItens +=  1
	        	}	        			        		
	        })
	   }); 
    
     $("#valortotalpedido").html("<strong>Total de itens </strong> " + totalItens + "<strong> - Valor total</strong>  " + totalValor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
     $("#valortotalpedido").css("color","blue");;
}