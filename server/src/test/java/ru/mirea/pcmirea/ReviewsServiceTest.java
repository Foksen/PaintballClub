package ru.mirea.pcmirea;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import ru.mirea.pcmirea.model.Review;
import ru.mirea.pcmirea.repository.ReviewsRepository;
import ru.mirea.pcmirea.service.ReviewsService;
import ru.mirea.pcmirea.service.ReviewsServiceImpl;

import java.util.List;

@ExtendWith(MockitoExtension.class)
public class ReviewsServiceTest {
    @Mock
    private ReviewsRepository reviewsRepository;
    @Captor
    private ArgumentCaptor<Review> captor;

    @Test
    void getReview() {
        String reviewName1 = "Test review1";
        String reviewName2 = "Test review2";
        Review review1 = new Review();
        Review review2 = new Review();
        review1.setName(reviewName1);
        review2.setName(reviewName2);
        Mockito.when(reviewsRepository.findAll()).thenReturn(List.of(review1, review2));
        ReviewsService reviewsService = new ReviewsServiceImpl(reviewsRepository);
        Assertions.assertEquals(2, reviewsService.readAll().size());
        Assertions.assertEquals(reviewName1, reviewsService.readAll().getFirst().getName());
    }

    @Test
    void createReview() {
        String reviewName = "Test review";
        Review review = new Review();
        review.setName(reviewName);
        ReviewsService reviewsService = new ReviewsServiceImpl(reviewsRepository);
        reviewsService.create(review);
        Mockito.verify(reviewsRepository).save(captor.capture());
        Review captured = captor.getValue();
        Assertions.assertEquals(reviewName, captured.getName());
    }
}
