
function getformulario() {

	produto = '"id": ' + $("#idproduto").val()  + '';
	produto += ',"nome": ' +  '"' +  $("#nome").val() + '"';
	produto += ',"empresaid": ' +  '"' +  sessionStorage.getItem("id") + '"';	
	produto += ',' 
	produto += serializeForm($("#fieldsetproduto :input"), true);
    produto = produto.replace("[","").replace("]","");
    
    empresa = ',"' + 'empresa' + '"' + ":" + getEmpresa(); 
	
	json  = "{";	
	json += produto;
	json += empresa;	
	json += "}";
	
	
    return json;
}			
