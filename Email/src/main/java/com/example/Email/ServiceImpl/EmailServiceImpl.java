package com.example.Email.ServiceImpl;

import org.springframework.stereotype.Service;

import com.example.Email.emaill.GEmailSender;
import com.example.Email.model.EmailModel;
import com.example.Email.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService{

    @Override
    public boolean sendEmail(EmailModel emailmodel) {
        // TODO Auto-generated method stub
        GEmailSender gEmailSender=new GEmailSender();
		String to=emailmodel.getEmail(); 
		String from="blogsbunny.official@gmail.com";
		String subject="Query Confirmation mail";
		String text="Dear "+emailmodel.getName()+","+"\n\n"+"Your query has been received. We will reach out to you soon."+"\n"+"Thank You"+"\n"+"\n"+"Below is your query attached"+"\n"+"\n"+"\""+emailmodel.getMessage()+"\"";
		boolean b=gEmailSender.sendEmail(to,from, subject, text);
		if(b){
			System.out.println("Email sent");
            return true;
		}
		else{
			System.out.println("Email not sent");
            return false;
		}
    }
       

}
