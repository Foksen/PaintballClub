package ru.mirea.pcmirea.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.mirea.pcmirea.model.Review;

@Repository
public interface ReviewsRepository extends JpaRepository<Review, Integer> { }
