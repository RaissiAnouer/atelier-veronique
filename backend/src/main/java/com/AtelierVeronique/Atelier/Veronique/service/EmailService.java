package com.AtelierVeronique.Atelier.Veronique.service;


import brevo.ApiClient;
import brevo.ApiException;
import brevo.Configuration;
import brevo.auth.ApiKeyAuth;
import brevoApi.TransactionalEmailsApi;
import brevoModel.SendSmtpEmail;
import brevoModel.SendSmtpEmailSender;
import brevoModel.SendSmtpEmailTo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailService {
    @Value("${brevo.api.key}")
    private String apikey;

    @Value("${brevo.sender.email}")
    private String fromEmail;

    public void sendEmail(String to, String subject, String body) {
        // Initialize Client
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        ApiKeyAuth apiKeyAuth = (ApiKeyAuth) defaultClient.getAuthentication("api-key");
        apiKeyAuth.setApiKey(apikey);

        TransactionalEmailsApi apiInstance = new TransactionalEmailsApi();

        // Sender & Recipient
        SendSmtpEmailSender sender = new SendSmtpEmailSender();
        sender.setEmail(fromEmail);
        sender.setName("ATELIER VERONIQUE");

        SendSmtpEmailTo recipient = new SendSmtpEmailTo();
        recipient.setEmail(to);

        // Build Email
        SendSmtpEmail sendSmtpEmail = new SendSmtpEmail();
        sendSmtpEmail.setSender(sender);
        sendSmtpEmail.setTo(List.of(recipient));
        sendSmtpEmail.setHtmlContent(body);
        sendSmtpEmail.setSubject(subject);

        try {
            apiInstance.sendTransacEmail(sendSmtpEmail);
        } catch (ApiException e) {
            // This is the CRITICAL part to see what's wrong
            System.err.println("Brevo Error Code: " + e.getCode());
            System.err.println("Brevo Error Body: " + e.getResponseBody());
            e.printStackTrace();
        }
    }


}
