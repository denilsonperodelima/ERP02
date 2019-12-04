package com.velocinotech.erp02.resources.utils;

import java.util.Random;

import org.springframework.stereotype.Component;

@Component
public class SenhaInicial {
	
private Random rand = new Random();
	
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

public String getSenhaInicialRandom() {
	
	senha = newPassword();
	
    return senha;	
	
};

private String newPassword() {
	char[] vet = new char[10];
	for (int i=0; i<10; i++) {
		vet[i] = randomChar();
	}
	return new String(vet);
}

private char randomChar() {
	int opt = rand.nextInt(3);
	if (opt == 0) { // gera um digito
		return (char) (rand.nextInt(10) + 48);
	}
	else if (opt == 1) { // gera letra maiuscula
		return (char) (rand.nextInt(26) + 65);
	}
	else { // gera letra minuscula
		return (char) (rand.nextInt(26) + 97);
	}
}	

}
