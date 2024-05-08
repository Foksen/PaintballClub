package ru.mirea.pcmirea.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.mirea.pcmirea.model.Review;

public interface ReviewsRepository extends JpaRepository<Review, Integer> {
}
