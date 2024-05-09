package ru.mirea.pcmirea.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.mirea.pcmirea.model.Packet;

@Repository
public interface PacketsRepository extends JpaRepository<Packet, Integer> {
}
