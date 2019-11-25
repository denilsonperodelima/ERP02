package com.velocinotech.erp02.resources.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.stereotype.Component;

@Component
public class Micelaneas {

	public Date dataDoDia() {
	
	    Date data = new Date();
	    SimpleDateFormat formatador = new  SimpleDateFormat("dd/MM/yyyy");;
	    
	    formatador.format(data);
	    return data;
	    
	}
	
	public Boolean dataAtualEstaNoPeriodo(Date datainicio, Date datafim) {
		
		Date datadia = dataDoDia();
		
	    SimpleDateFormat formatador = new  SimpleDateFormat("dd/MM/yyyy");
	    SimpleDateFormat formatador2 = new  SimpleDateFormat("dd/MM/yyyy");;
	    
	    String datadiaString = formatador.format(datadia);
	    String datafimString = formatador2.format(datafim);
	    
	    if(datadiaString.equals(datafimString)) { //necessário para poder compara igualdade de data
	    	return true;	
	    }
				
		int ret = datadia.compareTo(datafim); //Data dia é maior que data fim ?
	                                          //se sim irá retornar 1	
		                                      //se não irá retornar -1

		
		if (ret == 1) { 
			return false;
		}
		
	    String datainicioString = formatador2.format(datainicio);
	    
	    if(datadiaString.equals(datainicioString)) { //necessário para poder compara igualdade de data
	    	return true;	
	    }
	    
		//Se data do dia menor que data fim, comparar se data inicio maior que data do dia
		ret = datainicio.compareTo(datadia);
		if (ret == 1) { 
			return false;
		}		
	
		return true;
		
	}
}
