package com.velocinotech.erp02.services;

import org.springframework.mail.SimpleMailMessage;

import com.velocinotech.erp02.domain.Usuario;
import com.velocinotech.erp02.domain.Pedido;

public interface EmailService {

	void sendOrderConfirmationEmail(Pedido obj);
	
	void sendEmail(SimpleMailMessage msg);
	
	void sendNewPasswordEmail(Usuario usuario, String newPass);
}