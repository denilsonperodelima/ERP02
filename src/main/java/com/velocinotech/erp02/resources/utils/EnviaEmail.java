package com.velocinotech.erp02.resources.utils;

import java.util.Properties;
import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.stereotype.Component;

@Component
public class EnviaEmail
{
  public void enviarEmail(String emailto, String assunto, String texto) {
    Properties props = new Properties();
    /** Parâmetros de conexão com servidor Gmail */
    props.put("mail.smtp.host", "smtp.gmail.com");
    props.put("mail.smtp.socketFactory.port", "465");
    props.put("mail.smtp.socketFactory.class", 
    "javax.net.ssl.SSLSocketFactory");
    props.put("mail.smtp.auth", "true");
    props.put("mail.smtp.port", "465");
 
    Session session = Session.getDefaultInstance(props,
      new javax.mail.Authenticator() {
           protected PasswordAuthentication getPasswordAuthentication() 
           {
                 return new PasswordAuthentication("denilsonperodelima3@gmail.com", 
                 "svk6546@10");
           }
      });
 
    /** Ativa Debug para sessão */
    //session.setDebug(true);
 
    try {
 
      Message message = new MimeMessage(session);
      message.setFrom(new InternetAddress("denilsonperodelima3@gmail.com")); 
      //Remetente
 
      Address[] toUser = InternetAddress //Destinatário(s)
                 .parse(emailto);  
                 //.parse("denilsonperodelima@gmail.com, denilsonperodelima2@gmail.com");             
 
      message.setRecipients(Message.RecipientType.TO, toUser);
      message.setSubject(assunto);//Assunto
      message.setText(texto);
      /**Método para enviar a mensagem criada*/
      Transport.send(message);
 
      //System.out.println("Feito!!!   " + emailto);
 
     } catch (MessagingException e) {
        throw new RuntimeException(e);
    }
  }
}


