package ru.mirea.pcmirea.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.mirea.pcmirea.model.Registration;

public interface RegistrationsRepository extends JpaRepository<Registration, Integer> {
}
