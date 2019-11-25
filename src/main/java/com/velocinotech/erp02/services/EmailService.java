package com.velocinotech.erp02.services;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import com.velocinotech.erp02.domain.Pedido;
import com.velocinotech.erp02.domain.Usuario;

@Service
public interface EmailService {

	void sendOrderConfirmationEmail(Pedido obj);
	
	void sendEmail(SimpleMailMessage msg);
	
	void sendNewPasswordEmail(Usuario usuario, String newPass);
}