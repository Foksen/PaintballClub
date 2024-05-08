package ru.mirea.pcmirea.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.mirea.pcmirea.model.Packet;

public interface PacketsRepository extends JpaRepository<Packet, Integer> {
}
