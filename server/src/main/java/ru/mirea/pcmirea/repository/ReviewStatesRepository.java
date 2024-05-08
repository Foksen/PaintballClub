package ru.mirea.pcmirea.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.mirea.pcmirea.model.ReviewState;

public interface ReviewStatesRepository extends JpaRepository<ReviewState, Integer> {
}
