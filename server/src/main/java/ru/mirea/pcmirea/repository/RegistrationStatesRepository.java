package ru.mirea.pcmirea.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.mirea.pcmirea.model.RegistrationState;

public interface RegistrationStatesRepository extends JpaRepository<RegistrationState, Integer> {
}
