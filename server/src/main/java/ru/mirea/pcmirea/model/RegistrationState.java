package ru.mirea.pcmirea.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "registration_states")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class RegistrationState {
    @Id
    @Column(name = "id")
    @SequenceGenerator(name = "registrationStatesId", sequenceName = "registration_state_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "registrationStatesId")
    private int id;

    @Column(name = "name", unique = true)
    private String name;
}
