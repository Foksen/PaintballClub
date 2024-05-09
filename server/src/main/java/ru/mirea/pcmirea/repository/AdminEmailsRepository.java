package ru.mirea.pcmirea.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.mirea.pcmirea.model.AdminEmail;

@Repository
public interface AdminEmailsRepository extends JpaRepository<AdminEmail, Integer> {
}
