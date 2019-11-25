function carregartrilhaEmontarlinhatexto(json) {
	
	$("#usuinc").val(json.usuinc)
	$("#dtinclui").val(json.dtinclui)
	$("#usualt").val(json.usualt)
	$("#dtaltera").val(json.dtaltera)	
	$("#usuexc").val(json.usuexc)
	$("#dtexclui").val(json.dtexclui)	
	
	var text = '<strong>incluído por </strong>' + json.usuinc 
	    text += ' em ' +  json.dtinclui	
	    
	if (json.dtaltera != null){
		text += ' / <strong> alterado por </strong> ' + json.usualt 
	    text += ' em ' +  json.dtaltera			
	}    

	if (json.dtexclui != null){
		text += ' / <strong> excluído por</strong>  ' + json.usuexc 
	    text += ' em ' +  json.dtexclui			
	} 
	
	$("#trilhaauditoria").html(text)  
    $('#trilhaauditoria').css("color","blue");
}
function definirusuariostrilha() {
	if($("#usuinc").val() == ""){
		$("#usuinc").val(sessionStorage.getItem("usu"))
		return;
	}
	$("#usualt").val(sessionStorage.getItem("usu"))	
}
function montarlinhatexto(){
	
	var text = '<strong>incluído por </strong>' + $("#usuinc").val();
	text += ' em ' +  $("#dtinclui").val()
	    
	if ($("#dtaltera").val() != ""){
		text += ' / <strong> alterado por </strong> ' + $("#usualt").val();
	    text += ' em ' +  $("#dtaltera").val()				
	}    
	
	if ($("#dtexclui").val() != ""){
		text += ' / <strong> excluído por</strong>  ' + $("#usuexc").val();
	    text += ' em ' +  $("#dtexclui").val()	;		
	} 
	
	$("#trilhaauditoria").html(text)  
    $('#trilhaauditoria').css("color","blue");
}