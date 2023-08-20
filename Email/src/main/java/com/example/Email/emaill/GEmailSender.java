package com.example.Email.emaill;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Value;

import com.example.Email.Secret.Secrets;

import jakarta.mail.Authenticator;
import jakarta.mail.Message;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

public class GEmailSender {
    public boolean sendEmail(String to,String from,String subject,String text){
        boolean flag=false; 

        Properties properties=new Properties();
        properties.put("mail.smtp.auth", true);
        properties.put("mail.smtp.starttls.enable",true);
        properties.put("mail.smtp.port","587");
        properties.put("mail.smtp.host","smtp.gmail.com");

        String username="blogsbunny.official";

        Secrets secrets=new Secrets();

        String password=secrets.getPassword();
         

        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication(){
                return  new PasswordAuthentication(username,password);
            }
        });

        try {
            Message message= new MimeMessage(session);
            message.setRecipient(Message.RecipientType.TO,new InternetAddress(to));
            message.setFrom(new InternetAddress(from));
            message.setSubject(subject);
            message.setText(text);

            Transport.send(message);
            flag=true;

            
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }



        return flag;
    }
}
