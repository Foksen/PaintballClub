package ru.mirea.pcmirea.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Table(name = "registrations")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class Registration {
    @Id
    @Column(name = "id")
    @SequenceGenerator(name = "registrationsId", sequenceName = "registrations_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "registrationsId")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy HH:mm:ss")
    private Timestamp date;

    @Column(name = "comment")
    private String comment;

    @ManyToOne
    @JoinColumn(name = "packet_id")
    private Packet packet;

    @ManyToOne()
    @JoinColumn(name = "state_id")
    private RegistrationState state;
}
