package com.velocinotech.erp02.resources.utils;

import java.util.Random;

import org.springframework.stereotype.Component;

@Component
public class SenhaInicial {
	
String [] animais = {"cahorro", "gato", "coelho","lebre", "cavalo", "lobo","baleia", "macaco","foca"
		            ,"coruja","camelo","cobra","tigre","urso","elefante" };	

String [] cores = {"azul", "verde","lilas","cinza","prata","marrom","laranja","rosa","bege"};

Integer ano = 1967;

String senha;


public String getSenhaInicial() {
	
	Random random = new Random();
	int numero = random.nextInt(51);	
	
	senha = animais[random.nextInt(animais.length)] + cores[random.nextInt(cores.length)] + "@" + (ano + numero) ;
	
    return senha;	
	
};

}
