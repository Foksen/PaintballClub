package ru.mirea.pcmirea.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.mirea.pcmirea.model.RegistrationState;

@Repository
public interface RegistrationStatesRepository extends JpaRepository<RegistrationState, Integer> {
}
