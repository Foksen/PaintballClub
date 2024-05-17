package ru.mirea.pcmirea.service;

public interface EmailService {
    void sendEmail(String to, String subject, String text);
}
