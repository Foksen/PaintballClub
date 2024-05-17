package ru.mirea.pcmirea.util;

import org.springframework.format.annotation.DateTimeFormat;
import ru.mirea.pcmirea.model.Registration;
import ru.mirea.pcmirea.model.Review;

import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;

public class EmailFormatter {
    private static final SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy HH:mm:ss");

    public static String formatEmailReviewsPut(Review review) {

        return "Имя: " + review.getName() + "\n" +
                "Почта: " + review.getEmail() + "\n" +
                "Опыт: " + review.getExperience() + "\n" +
                "Текст: " + review.getText() + "\n" +
                "Дата: " + formatter.format(review.getDate());
    }

    public static String formatEmailRegistrationsPut(Registration registration) {
        return "Имя: " + registration.getName() + "\n" +
                "Почта: " + registration.getEmail() + "\n" +
                "Дата: " + formatter.format(registration.getDate()) + "\n" +
                "Комментарий: " + registration.getComment();
    }
}
