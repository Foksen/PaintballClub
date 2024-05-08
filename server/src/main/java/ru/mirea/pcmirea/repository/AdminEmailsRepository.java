package ru.mirea.pcmirea.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.mirea.pcmirea.model.AdminEmail;

public interface AdminEmailsRepository extends JpaRepository<AdminEmail, Integer> {
}
