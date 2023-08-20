package com.example.Email.ErrorHandler;

public class InvalidCredentialsException extends RuntimeException  {
    public InvalidCredentialsException(String message) {
        super(message);
    }
}


