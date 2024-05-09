package ru.mirea.pcmirea.service;

import ru.mirea.pcmirea.model.Review;

import java.util.List;

public interface ReviewsService {
    void create(Review review);
    List<Review> readAll();
    Review read(int id);
    boolean update(Review review, int id);
    boolean updateNonNull(Review review, int id);
    boolean delete(int id);
}
