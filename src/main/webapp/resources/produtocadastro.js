$(document).ready(function(){
	$('#frmprodutocadastro').bind('submit',function(e){
		e.preventDefault();
	});
	lancawait();	
});

window.onload = function(e) {
	e.preventDefault(); 
	
    sessionStorage.setItem("id","1");
    sessionStorage.setItem("nome","EMPRESA TESTE NO LOAD SA")
 
  	$('#emp').html(sessionStorage.getItem("nome"));
	$('#btnNovo').trigger('click'); 
	produtocadastrocon("/grupo/" + sessionStorage.getItem("id") +  "/"  + "PRODUTO", "carregarcombos") 
	
	$("#pesobruto").mask("###.###.##0,000", {reverse: true});
	$("#pesoliquido").mask("###.###.##0,000", {reverse: true});
	$("#estoquemaximo").mask("###.###,00", {reverse: true});
	$("#estoqueminimo").mask("###.###,00", {reverse: true});
	$("#volume").mask("###.###,#00", {reverse: true});

	$("#valorvenda").mask("###.###.##0,00", {reverse: true});
	$("#valorcusto").mask("###.###.##0,00", {reverse: true});
  			
	//$("#idproduto").val("2")
	//produtocadastrocon("/produto/"  + $("#idproduto").val(), "consultarprodutoid")  
    swal.close();
}

$("#gravarproduto").click( function (e) {
    $('#msg').html("");
    if (consistirpagina() == false) {
       return;	
    };
	
    definirusuariostrilha(); //definir usuario de inclusao e.ou alteracao
    
    var json = getformulario();		    

    //alert("json " + json);
    //console.log(json)
    //return;

	produtocadastrogrv("/produto", json, "gravarproduto")				
					    		    
});	

$("#pesquisarfunc").click( function (e) {
	e.preventDefault();
	$("#modalrelac").html("PRODUTO");
    $('#modalprodutoconsultanome').modal('toggle');
});  

$("#categoriadefinir").click( function (e) {
	e.preventDefault();
	
	$('#modalcategorialinha').html($('#categorialinha').html())
    $('#categoriamodal').modal('toggle');
});


//botao selecionar do modal
$(document).on("click", "#selecionarprodutoitem", function(e){	
	e.preventDefault();
	
	$("#idproduto").val($(this).parent().parent().find("#idmodal").text()); 	
	$("#nome").val($(this).parent().parent().find("#nomemodal").text()); 
	
	$('#produtoconsultanomefechar').trigger('click'); //fechou modal

	produtocadastrocon("/produto/"  + $("#idproduto").val(), "consultarprodutoid")     			
});
  	    
   		  		
$("#btnNovo").click( function (e) {
	e.preventDefault();
	var categoria = $("#categoria").val();
	var subcategoria1 = $("#subcategoria1").val();
	var subcategoria2 = $("#subcategoria2").val();	
	var subcategoria3 = $("#subcategoria3").val();
	var subcategoria4 = $("#subcategoria4").val();	
	
	limparFormulario($('#frmprodutocadastro')); // criar funcao em util
    $("#idproduto").val("null");
    $("#nome").focus();
    
	$("#categoria").val(categoria);
	$("#subcategoria1").val(subcategoria1);
	$("#subcategoria2").val(subcategoria2);
	$("#subcategoria3").val(subcategoria3);
	$("#subcategoria4").val(subcategoria4);
	
});	   		

$(document).on("keyup", function(e) { 
	
	if ( e.altKey && ( e.which == 78 ) ) { //ALT + N
	   $('#btnNovo').trigger('click');
	}
	if ( e.altKey && ( e.which == 80 ) ) { // ALT + P
		   $('#pesquisarfunc').trigger('click');
		   //activateTab("periodosuspenso")	
		}   			
});
   		

function consistirpagina() {

	if ($("#nome").val() == "") {
	    alert("Nome inválido"); 	
        $("#nome").focus();
		return false;
	}  
	if ($("#categoria").val() == "") {
	    alert("Defina ao menos uma categoria"); 
        $("#categoriadefinir").focus();	    
		return false;
	} 		   			   			
}
function carregarproduto(json){
	//alert("json " + JSON.stringify(json))
	
	$.each(json, function(key, value) {
		  carregarform($("#fieldsetproduto :input"), key, value);
	});
	$("#idproduto").val(json.id)
	$("#nome").val(json.nome)
	carregartrilhaEmontarlinhatexto(json)
	categorialinhaimprimir(json) //categoriamodal
	    	  
   }

function limparFormulario(){
		$('#frmprodutocadastro').each (function(){
   			  this.reset();
   			});
 }; 