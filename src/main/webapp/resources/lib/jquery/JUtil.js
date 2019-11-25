function getAmbiente(){
	    //return "http://localhost:8080";
        //return "http://35.225.125.57:8080";
	    return "http://erp02.herokuapp.com"
}

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

function geraLink () {
	
	var d = new Date();
    var n = d.getMonth();
    var y = d.getFullYear();
	
    var max = 932726;
    var min = 1;

    var numero = Math.floor(Math.random() * (max - min)) + 1
   
    var link = y + n + numero;
    
    return link;
    
    
}

function formataJsonForm (json) {
    
    var jsonsaida = "{";   
    
    for (var i = 0; i < json.length; i++){
   	 
       var dadosJ = JSON.stringify(json[i]);
   	 
       var linha_nova = dadosJ;
   	var linha = linha_nova.replace('"name":', '');
   	var linha2 = linha.replace('"value":', ''); 
   	var linha3 = linha2.replace('}', ',');
   	var linha4 = linha3.replace('{', '');
   	var linha5 = linha4.replace(',', ':');   	
   	
   	jsonsaida += linha5;
   	
    }


   	
    jsonsaida += "}";

	var linha6 = jsonsaida.replace(',}', '}');   	   	    	
   	jsonsaida = linha6;
    
    return jsonsaida;
    
	};
function limparformulario(form) {
	$(form).each (function(){
		  this.reset();
	});
};
function apenasNumeros(string) 
{
    var numsStr = string.replace(/[^0-9]/g,'');
    return parseInt(numsStr);
};

function ConvertddmmaaaaToaaaammdd(data){

	var dataReturn = ""; 
	dataReturn += data.substring(6, 10);
	dataReturn += "-";
	dataReturn += data.substring(3, 5);
	dataReturn += "-";
	dataReturn += data.substring(0, 2);

    return dataReturn;
    
 }

function consisteCNPJ_CPF(pessoa,numero) {

	switch (pessoa) {
	  case "FISICA":	
			if(numero == ""){
				alert("CPF não informado!");	
				return false;
			};
			if(numero.length < 11){
				alert("CPF invalido!");					
				return false;
			};				  
		   if (!modulo11CPF(numero)) {
       	          alert("Digito CPF inválido");					  
			      return false;
			   };
		    return true;				   
			break;
	  default:
			if(numero == ""){
				alert("CNPJ não informado!");	
				return false
			};
			if(numero.length < 14){
				alert("CNPJ invalido!");					
				return false;
			}			  
		   if (!modulo11CNPJ(numero)) {
       	      alert("Digito CNPJ inválido");					   
			  return false;
		   }
		   return true;
		   break;
		}				
}

function modulo11CNPJ(num){
	
    //num = $("#txtPesqDocumento").val().replace(/[^\d]+/g,'');
    num = num.replace(/[^\d]+/g,'');
    
	var base = 2;		
	var fator = 9;		
	var digito;
	var resto;
	var numeros = new Array();
	var parcial = new Array();
	var soma = 0;
	var tam =0;	
	var siz =0;
	var dv1=0;
	var dv_sv = 0;
	
	/*
	if(num == ""){
		alert("CNPJ não informado!");	
		return false
	};
	if(num.length < 14){
		alert("CNPJ invalido!");					
		return false;
	}
	*/
	
	siz = num.substr(0,6);
            //valida se o dominio/protoco eh valido
	/*
	if(siz != '829526'){
		alert("Nosso Numero proto invalido!");
		limpaCampos("formBaixa");
		return false;
	}	
	*/	
	//recebe apenas os 12 primeiros digitos para primeiro cálculo
	tam = num.substr(0,12);	
	/*separação dos números*/
	for(i=tam.length;i>0;i--){		    
		numeros[i]=tam.substr(i-1,1); //pega cada número isoladamente			
		parcial[i]=numeros[i]*fator; //Efetua a multiplicação do número pelo fator
		
		//alert("numeros " + numeros[i]  + " " + fator);
		
		soma += parcial[i]; //soma dos digitos
		if(fator==base)fator=10; //restaura o fator de multiplicação para 2
		fator --;			 
	}		
	/*Calculo do módulo11*/
	resto = soma % 11;		
	if (resto < 10){ 
		dv = resto; 
		dv_sv = dv * 10
	}else if(resto == 10){ 
		dv = 'x'; 
	}	
	
	//recebe apenas os 13 primeiros digitos para segundo cálculo
	tam = num.substr(0,13);	
	soma =0;
	fator = 9;	
	/*separação dos números*/
	for(i=tam.length;i>0;i--){		    
		numeros[i]=tam.substr(i-1,1); //pega cada número isoladamente			
		parcial[i]=numeros[i]*fator; //Efetua a multiplicação do número pelo fator
		
		//alert("numeros " + numeros[i]  + " " + fator);
		
		soma += parcial[i]; //soma dos digitos
		if(fator==base)fator=10; //restaura o fator de multiplicação para 2
		fator --;			 
	}		
	/*Calculo do módulo11*/
	
	//alert("soma " + soma);
	resto = soma % 11;		
	if (resto < 10){ 
		dv = resto; 
		dv_sv = dv_sv + dv
	}else if(resto == 10){ 
		dv = 'x'; 
	}				
	
	
	//verifica se o digito verificador eh o mesmo calculado pelo módulo11
	dv1 = num.substr(12,14);
	//alert("dv_sv " + dv_sv + " dv1 " + dv1);
	if(dv_sv != dv1){
		//alert("Digito CNPJ invalido!");
		return false;
	}		
	return true;
}
    //function limpaCampos(frm){		
	//document.forms[frm].reset();
    //}

function modulo11CPF(num){
	
    num = num.replace(/[^\d]+/g,'');
    	
	var fator = 2;		
	var digito;
	var resto;
	var numeros = new Array();
	var parcial = new Array();
	var soma = 0;
	var tam =0;	
	var siz =0;
	var dv1=0;
	var dv_sv = 0;
	
	//recebe apenas os 9 primeiros digitos para primeiro cálculo
	tam = num.substr(0,9);	
	/*separação dos números*/
	for(i=tam.length;i>0;i--){		    
		numeros[i]=tam.substr(i-1,1); //pega cada número isoladamente			
		parcial[i]=numeros[i]*fator; //Efetua a multiplicação do número pelo fator
		soma += parcial[i]; //soma dos digitos
		fator ++;			 
	}		
	/*Calculo do módulo11*/
	resto = soma % 11;		
	if (resto < 2){ 
		dv =0
		dv_sv = dv;
	}else { 			
		dv = 11 - resto; 
		dv_sv = dv * 10;
	}	
	
	//recebe apenas os 10 primeiros digitos para segundo cálculo
	tam = num.substr(0,10);	
	fator = 2;	
	soma =0;
	/*separação dos números*/
	for(i=tam.length;i>0;i--){		    
		numeros[i]=tam.substr(i-1,1); //pega cada número isoladamente			
		parcial[i]=numeros[i]*fator; //Efetua a multiplicação do número pelo fator
		soma += parcial[i]; //soma dos digitos
		fator ++;			 
	}			
	/*Calculo do módulo11*/
	resto = soma % 11;		
	if (resto < 2){ 
		dv =0
	}else { 			
		dv = 11 - resto;
	}				
	
	dv_sv = dv_sv + dv;
	//verifica se o digito verificador eh o mesmo calculado pelo módulo11
	dv1 = num.substr(9,2);
	//alert("dv_sv " + dv_sv + " dv1 " + dv1);
	if(dv_sv != dv1){
		return false;
	}		
	return true;
}
function dataformatada() {

        var data =  serializeForm($("#div1 :input"), true)
            data = data.replace("[","{").replace("]","}")

	 return data		
}
function dataformatadaarpz() {

    var data =  $("#txtArpz1").val();
 return data		
}
//return "http://35.184.144.191:8080";
	function serializeForm(container, tirarcolchetes) {  		

		  var inputs = $(container);	
		  var obj = $.map(inputs, function(n, i)
		  {
		      var o = {};
		      //retira o checkbox
		      if (n.type != "checkbox" && n.type != "search" )  {
			      o[n.name] = $(n).val();
				  //alert("json object " + n.name + " -- " + $(n).val()  );
			      return o;
		      }
		  });
		  
		  if (tirarcolchetes) { 
		     json = JSON.stringify(obj).replace(/{/g,"").replace(/}/g, "");
		  } else { json = JSON.stringify(obj)}

		  //alert("json object " + json  );	  
		  
		  return json;
		   
 }

		function serializeFormOccurs(container, numquebra) {  		

 		  var inputs = $(container);
 		  var list = [];
 		  var linha = "";
 		  var obj = $.map(inputs, function(n, i)
 		  {
 			  var o = {};
 		      o[n.name] = $(n).val();
 		      
 		      if (i==0) {
 		    	list = []; 
		   		      json = JSON.stringify(o).replace(/{/g,"").replace(/}/g, "")
 		   		      linha+= json ; 
 		      } else {
 		    	if ((i % numquebra) == 0){
 		    		list.push("{" + linha + "}");
 		    		linha = JSON.stringify(o).replace(/{/g,"").replace(/}/g, "")
 		    		}  else {
 		   		      json = JSON.stringify(o).replace(/{/g,"").replace(/}/g, "")
 		   		      linha+= "," + json ;  
 		    		}
 		      }

 		      return o;
 		  });
   		  //list.push("{" + linha + "}");  //ultima	  **quando for itens  não deve retornar  
		  return list;   		   
        }
		function getEmpresa(){
			
			var emp = "";
			
			emp  += "{" + '"' + 'id' +'":' +     sessionStorage.getItem("id");;	
			//emp  += "{" + '"' + 'id' +'":' + "1";	
			emp  += "" + ',"' + 'nome' +'":' + '"' + "Empresa Teste SA" + '"' ;
			emp  += "" + ',"' + 'documento' +'":' + '"' + "52.928.736" + '"';
			emp  += "" + ',"' + 'endereco' +'":' + '"' + "Av. do Cursino, 45" + '"';	
			emp  += "" + ',"' + 'cep' +'":' + '"' + "04296-000" + '"';	
			emp  += "" + ',"' + 'cidade' +'":' + '"' + "São Paulo" + '"';		
			emp  += "" + ',"' + 'uf' +'":' + '"' + "sp" + '"';	
			emp  += "" + ',"' + 'status' +'":' + '"' + "ATIVA" + '"';
			emp  += "" + ',"' + 'Contato1' +'":' + '"' + "Contato1" + '"';			
			emp  += "" + ',"' + 'Contato2' +'":' + '"' + "Contato2" + '"';	
			emp  += "" + ',"' + 'Contato3' +'":' + '"' + "Contato3" + '"';			
			emp  += "}" ;			
		
		    return emp;
		}
		function carregarComboSemValue(combo, json) {

			   if(typeof(json)  != "object") {	
				 json = $.parseJSON(json)		   
			   }
			  var listitems = '';		  
			  $.each(json, function(i, item){
				  if (item.dtexclui == null){
					  listitems += '<option value=' + '"' + item.descricao + '"' +  '>' + item.descricao + '</option>';	
				  }
			      
			  });

			  $(combo).append(listitems);		
					
		}		
		function carregarComboSemValueAntes(combo, json) {

			   if(typeof(json)  != "object") {	
				 json = $.parseJSON(json)		   
			   }
			  var listitems = '';		  
			  $.each(json, function(i, item){
				  if (item.dtexclui == null){
					  listitems += '<option value=' + item.descricao + '>' + item.descricao + '</option>';					  
				  }
			      
			  });

			  $(combo).append(listitems);		
					
		}		
		function carregarCombo(combo, json) {

			   if(typeof(json)  != "object") {	
				 json = $.parseJSON(json)		   
			   }
			  var listitems = '';		  
			  $.each(json, function(i, item){
				  if (item.dtexclui == null){
					  listitems += '<option value=' + item.id + '>' + (item.descricao).trim() + '</option>';
				  }
			      
			  });

			  $(combo).append(listitems);		
					
		}
		function carregarComboValue(combo, json) {

			   if(typeof(json)  != "object") {	
				 json = $.parseJSON(json)		   
			   }
			  var listitems = '';		  
			  $.each(json, function(i, item){
				  listitems += '<option value=' + item.valor + '>' + item.descricao + '</option>';
			  });

			  $(combo).append(listitems);		
					
		}
		function hoje() {

			   var date = new Date();
			   
			   var datahoje = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()))				   
			   + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) 
			   + '/' + date.getFullYear()
	
			 return datahoje		
		}	
   		
   		function activateTab(tab){
   			alert("tab " + tab)
   		    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
   		};	
   		
function carregarform(container, key, value) {  		

  var inputs = $(container);	
  var obj = $.map(inputs, function(n, i)
  {
      var o = {};
      //if(n.type == "select-one"){alert("name " + n.name + " " + n.type )}
      if (n.type == "text" || n.type == "hidden" || n.type == "select-one" )  {
	      o[n.name] = $(n).val();
	      if (n.name == key) {
	    	  $(n).val(value); 
	      }
      } 
  });  
}	
function getdescricaofromli(container, index, id) {  		

  var valor = "";
      var i2 = 0;
	  var inputs = $(container);	
	  var obj = $.map(inputs, function(n, i)
	  {
	      var o = {};
	      //alert("id em getdescricao " + n.id)
	      if (n.id == id)  {
		      o[n.name] = $(n).val();
			  if(i2 == index){
				  valor = $(n).val();
				  };
			  i2 = i2 + 1
	      }
	  });
      return valor;
}	
function lancawait(){
    Swal.showLoading()
    timerInterval = setInterval(() => {
    }, 100)
    
    	
}