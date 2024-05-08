package ru.mirea.pcmirea.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.mirea.pcmirea.model.Review;
import ru.mirea.pcmirea.repository.ReviewsRepository;

import java.util.List;

@Service
@Slf4j
public class ReviewsServiceImpl implements ReviewsService {
    private final ReviewsRepository reviewsRepository;

    public ReviewsServiceImpl(ReviewsRepository reviewsRepository) {
        this.reviewsRepository = reviewsRepository;
    }

    @Override
    public void create(Review review) {
        reviewsRepository.save(review);
    }

    @Override
    public List<Review> readAll() {
        return reviewsRepository.findAll();
    }

    @Override
    public Review read(int id) {
        return reviewsRepository.getReferenceById(id);
    }

    @Override
    public boolean update(Review review, int id) {
        if (reviewsRepository.existsById(id)) {
            review.setId(id);
            reviewsRepository.save(review);
            return true;
        }
        return false;
    }

    @Override
    public boolean delete(int id) {
        if (reviewsRepository.existsById(id)) {
            reviewsRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
