	$(document).ready(function(){

		$('#frmcadastro').bind('submit',function(e){
  			e.preventDefault();
  		});

	});

	$("#voltar").css({marginLeft:'21%'});
	
	({marginLeft:'21%'})
	
	$("#btnNovo").click( function (e) {
		e.preventDefault();

		if( $("#txtArpz1").val() == ""){
			alert("Informe a senha");
			$("#txtArpz1").focus();
			return;
		} 
		if( $("#txtArpz2").val() == ""){
			alert("Informe a senha de confirmação");
			$("#txtArpz2").focus();
			return;
		}		
		if( $("#txtArpz1").val() != $("#txtArpz2").val()){
			alert("Senhas diferente");
			$("#txtArpz2").focus();
			return;
		} 
		
		alterararpz();
		
	});		
   		