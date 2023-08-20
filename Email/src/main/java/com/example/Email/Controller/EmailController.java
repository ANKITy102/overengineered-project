package com.example.Email.Controller;

import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.Email.ApiModel.APIReturnModel;
import com.example.Email.model.EmailModel;
import com.example.Email.service.EmailService;

@CrossOrigin("*")
@RestController
@RequestMapping("/contact")
public class EmailController {

    @Autowired
    private EmailService emailService;
    private Vector<Boolean> contactVec;
    private APIReturnModel apiReturnModel;


    @PostMapping("/send")
    public ResponseEntity<?> sendEmail(@RequestBody EmailModel emailmodel) {
        apiReturnModel = new APIReturnModel();
        contactVec = new Vector<>();
        try {
            boolean b = this.emailService.sendEmail(emailmodel);
            contactVec.add(b);
            apiReturnModel.setData(contactVec);
            apiReturnModel.setStatus("Success");
            apiReturnModel.setMessage("Your data");
            apiReturnModel.setCount(contactVec.size());

        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            apiReturnModel.setStatus("fail");
            apiReturnModel.setMessage(e.getMessage());
            apiReturnModel.setCount(0);
        }
        return ResponseEntity.ok(apiReturnModel);
    }
}
