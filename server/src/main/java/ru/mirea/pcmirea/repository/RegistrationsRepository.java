package ru.mirea.pcmirea.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.mirea.pcmirea.model.Registration;

import java.util.List;

@Repository
public interface RegistrationsRepository extends JpaRepository<Registration, Integer> {
    List<Registration> findAllByOrderByIdAsc();
}
