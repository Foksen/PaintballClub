package ru.mirea.pcmirea.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "packets")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class Packet {
    @Id
    @Column(name = "id")
    @SequenceGenerator(name = "packetsId", sequenceName = "packets_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "packetsId")
    private int id;

    @Column(name = "name", unique = true)
    private String name;
}
