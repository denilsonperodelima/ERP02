  		$(document).ready(function(){

			$('#frmProduto').bind('submit',function(e){
	  			e.preventDefault();
	  		});		
  		});
 		  		   		
  		//Chama modal pesquisa
   		$("#bntConsultar").click( function () {
             $('#modalPesquisa').modal('toggle');
  		});  
   		
  		//Grava dados Pessoa 
   		$("#btnVoltar").click( function () {
 			var url = "";
 			url += './pessoabusca.html?param1=';
 			url += $("#txtempresa").val();

 	        window.parent.location.href = url;   
 	        
  		});
 
  		//Limpar o formulário 
   		$("#bntNovo").click( function () {
   			limparFormulario();
	        $('#msg').html("Digite os dados para inclusão"); 
  		});
   		
  		//Grava dados Produto 
   		$("#bntGravar").click( function () {

   			$('#msg').html("");
   			
   			if ($("#txtId").val() != "") {  
   				$('#txtId').prop('disabled', false);
   				}

   	        var json = JSON.parse(JSON.stringify(jQuery('#frmProduto').serializeArray()));   	        
   	        var json2 = formataJsonForm(json);
   	        //alert("Json 2ffff" + json2)
   	     			
   			var dadosJ = JSON.stringify(json2);
            var obj1 = $.parseJSON(dadosJ); //convert string to obj

   			$('#txtId').prop('disabled', true);
   			
	   		var ambiente = getAmbiente();
	   	    arg = "";
	   		arg += ambiente;
	   	    arg += '/pessoa/rest/produto/';
	   	    	   	     
  		    $.ajax({
  		    	type: 'POST',
  		    	url: arg,
  		    	contentType: 'application/json;charset=utf-8',
  		    	dataType: 'json',
  		    	method: 'POST',
				cache: false,
  		        data: obj1, 		    	
  		        success:function(response){
  		           $('#txtId').val(apenasNumeros(response.msg));
  		           $('#msg').html(response.msg); 		           
  		        },
  		        error: function(e, msg) {
  		             $('#msg').html("***Erro - satus="  + e.status +  "---> " + e.statusText);
  		             $('#msg').css("color","##FF0000");

			    }
			    
			    
  		    }); 
  		      					  			
  		});

 		//Pesquisa por nome
   		$(document).on('click', '#btnPesquisarNome', function(){

   			var ambiente = getAmbiente();
   	   			
   			if ($("#txtPesqNome").val() == "")
   			   {alert("Preencha o campo")
   			   } else
   			 	{
	   	   			var idEmpresa = getUrlVars()["param1"];
	   	   		    idEmpresa = idEmpresa.replace('#', '');
	   	   			
	   	   		    arg = "";
	   	   		    arg += ambiente;
	   	   		    arg += '/pessoa/rest/produto/nome/';
	   	   		    arg += idEmpresa;
	   	   		    arg += '/';
	   	   		    arg += $("#txtPesqNome").val();
   	   		    
	   	   		    getProdutos(arg);
	   	   		    

   				}
   				

			
  		});
  		
   		//Clicou btnEditar pesquisar por nome
  		$(document).on("click", ".btn-success", function(){
  			
  			//salva o numero id
 			var Id = $(this).parent().parent().find(".col-xs-1").text();	
 			$('#txtId').val(Id);
   			
  			$('#btnPesqFechar').trigger('click');
 
  			getProdutoId(Id);
  			
    	});
  		
   		

       window.onload = function() {
  	        
			var first = getUrlVars()["param2"];
			$("#txtidempresa").val(first);

  			$("#txtPesoBruto").mask("###.###.##0.000", {reverse: true});
  			$("#txtPesoLiquido").mask("###.###.##0.000", {reverse: true});
  			$("#txtTamanho").mask("###.###.##0.000", {reverse: true});
  			$("#txtEstoque").mask("###.###.#00", {reverse: true});
  			$("#txtEstoqueMin").mask("00000");

  			$("#txtvalorvenda").mask("###.###.##0.00", {reverse: true});
  			$("#txtvalorcusto").mask("###.###.##0.00", {reverse: true});	
  			
            $('#txtNome').focus();
				
  	}  	//document ready close;	     
       
  
function getUrlVars(){
    var vars =[], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?')+1).split('&');
    for(var i =0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
	      vars.push(hash[0]);
	      vars[hash[0]]= hash[1];
	    }
	    return vars;
}

function getProdutoId(id) {

	var first = getUrlVars()["param2"];
	var ambiente = getAmbiente();
	arg = "";
	arg += ambiente;
	arg += '/pessoa/rest/produto/';		
	arg += id;
    
    $.ajax({
      type: 'GET',
      url:  arg,
      dataType:'json',
        success:function(response){
        	carregarFormProduto(response);
        },
        error: function(e, msg) {
          console.log(e);
          console.log(msg); 
       }
    }); 
    	
}

function carregarFormProduto(json){

	$('#txtNome').val(json.nome);
	$('#txtPesoBruto').val(json.pesobruto);
	$('#txtPesoLiquido').val(json.pesoliquido);
	$('#txtTamanho').val(json.tamanho);
	$('#txtLocalEstoque').val(json.localestoque);	
	$('#txtEstoque').val(json.estoque);		
	$('#txtEstoqueMin').val(json.estoqueminimo);	
	$('#txtvalorvenda').val(json.valorvenda);			
	$('#txtvalorcusto').val(json.valorcusto);	
	$('#txtfornecedor').val(json.fornecedor);		
	$('#txtidempresa').val(json.id_empresa);		
}  

function ConvertFormToJSON(form){

    var array = $(form).serializeArray();
    var json = {};
    jQuery.each(array, function() {
        json[this.name] = this.value || '';
        });

         return json;
 }
function ConvertddmmaaaaToaaaammdd(data){

	var dataReturn = ""; 
	dataReturn += data.substring(6, 10);
	dataReturn += "-";
	dataReturn += data.substring(3, 5);
	dataReturn += "-";
	dataReturn += data.substring(0, 2);

    return dataReturn;
    
 }
function ConvertaaaammddToddmmaaaa(data){

	var dataReturn = ''; 
	dataReturn += data.substring(8, 10);
	dataReturn += '/';
	dataReturn += data.substring(5, 7);
	dataReturn += '/';
	dataReturn += data.substring(0, 4);
	
    return dataReturn;
    
 }
function getProdutos(url){
	    $.ajax({
		    	type: 'GET',
		    	url: url,
		    	dataType:'json',
		        success:function(response){
		         	carregarProdutos(response);
			        $('#msg').html("Digite os dados para alteração"); 
	
		        },
		        error: function(e, msg) {
		    console.log(e);
		    console.log(msg);				    }
		    }); 

}
	function carregarProdutos(json) {

		    //Limpa tabela antes de carregar
	   	  	$("#tablePesquisa tr").remove();	
	   	  	
			if (json.length == 0 ){

		    var newRow = $('<tr class="row">');
		    var cols = "";

		    cols += '<td class="col-xs-1">';
		    cols += '***';
		    cols += '</td>';
		    cols += '<td class="col-xs-2">';
		    cols += 'Não foram encontrados itens para esta pesquisa';
		    cols += '</td>';
		    cols += '';
		    cols += '</td>';

		    newRow.append(cols);
		    $("#tablePesquisa").append(newRow);
			} else {

         for (i=0; i < json.length ; i++) {

            var newRow = $('<tr class="row" id="linhaTabela">');
            var cols = "";

            cols += '<td class="col-xs-1">';
            cols += json[i].id;
            cols += '</td>';           
            cols += '<td class="col-xs-6">';
            cols += json[i].nome;
            cols += '</td>';	            
            cols += '<td class="col-xs-3"></td>';
            
            cols += '<td class="col-xs-3">';
            cols += '<button  class="btn btn-success btn-xs" type="submit" >Selecionar</button>';
            cols += '</td>';

            newRow.append(cols);
            $("#tablePesquisa").append(newRow);
			    }
		    }
		}
	function limparFormulario(){
			$('#frmProduto').each (function(){
	   			  this.reset();
	   			});
	            $('#txtNome').focus(); 
				$("#txtidempresa").val(getUrlVars()["param1"]);

    }
	
	
	  $(function(){
	   //   $("body").keypress(function(event)
  	      $("body").keydown(function(event)	    		  
	      {
  	    	 //Teclou insert  
  	    	 if (event.keyCode == 45){
  	    		 $('#bntNovo').trigger('click');} ;
  	    		 
  	  	   	 //Teclou F3 - Pesquisar 
  	    	 if (event.keyCode == 114){
  	    		 $('#bntConsultar').trigger('click');} ;
  	    		  	    		 
    		 
	    	 //alert("Pressionou a tecla " + event.keyCode) 
	      });
	  });
