package ru.mirea.pcmirea.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.mirea.pcmirea.model.ReviewState;

@Repository
public interface ReviewStatesRepository extends JpaRepository<ReviewState, Integer> {
}
