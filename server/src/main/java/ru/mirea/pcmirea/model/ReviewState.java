package ru.mirea.pcmirea.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "review_states")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class ReviewState {
    @Id
    @Column(name = "id")
    @SequenceGenerator(name = "reviewStatesId", sequenceName = "review_states_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reviewStatesId")
    private int id;

    @Column(name = "name", unique = true)
    private String name;
}
