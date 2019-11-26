package com.velocinotech.erp02.services;

import org.springframework.mail.SimpleMailMessage;

import com.velocinotech.erp02.domain.Pedido;
import com.velocinotech.erp02.domain.Usuario;

public interface EmailService {

	void sendOrderConfirmationEmail(Pedido obj);
	
	void sendEmail(SimpleMailMessage msg);
	
	void sendNewPasswordEmail(Usuario usuario, String newPass);
}
