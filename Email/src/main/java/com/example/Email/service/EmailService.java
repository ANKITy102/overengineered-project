package com.example.Email.service;

import com.example.Email.ErrorHandler.InvalidCredentialsException;
import com.example.Email.model.EmailModel;

public interface EmailService {
    public boolean sendEmail(EmailModel emailmodel) throws InvalidCredentialsException;
}
