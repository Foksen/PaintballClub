package ru.mirea.pcmirea.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "admin_emails")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class AdminEmail {
    @Id
    @Column(name = "id")
    @SequenceGenerator(name = "adminEmailsId", sequenceName = "admin_emails_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "adminEmailsId")
    private int id;

    @Column(name = "email", unique = true)
    private String email;
}
