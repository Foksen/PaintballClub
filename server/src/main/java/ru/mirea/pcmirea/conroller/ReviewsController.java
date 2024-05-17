package ru.mirea.pcmirea.conroller;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mirea.pcmirea.exception.ReviewNotFoundException;
import ru.mirea.pcmirea.model.Review;
import ru.mirea.pcmirea.service.AdminEmailsService;
import ru.mirea.pcmirea.service.EmailService;
import ru.mirea.pcmirea.service.ReviewsService;
import ru.mirea.pcmirea.util.EmailFormatter;

@RestController
@RequestMapping("/reviews")
@CrossOrigin
public class ReviewsController {
    @Autowired
    private ReviewsService reviewsService;

    @Autowired
    private AdminEmailsService adminEmailsService;

    @Autowired
    private EmailService emailService;

    @PersistenceContext
    private EntityManager entityManager;

    @GetMapping("/")
    public ResponseEntity<?> getReviews(@RequestParam(required = false) Integer id) {
        try {
            if (id == null) {
                CriteriaBuilder builder = entityManager.getCriteriaBuilder();
                CriteriaQuery<Review> reviewCriteriaQuery = builder.createQuery(Review.class);
                Root<Review> root = reviewCriteriaQuery.from(Review.class);
                reviewCriteriaQuery
                        .select(root)
                        .orderBy(builder.asc(root.get("id")));
                Query<Review> query = (Query<Review>) entityManager.createQuery(reviewCriteriaQuery);
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body(query.getResultList());
            }
            else {
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body(reviewsService.read(id));
            }
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/accepted")
    public ResponseEntity<?> getAcceptedReviews() {
        try {
            CriteriaBuilder builder = entityManager.getCriteriaBuilder();
            CriteriaQuery<Review> reviewCriteriaQuery = builder.createQuery(Review.class);
            Root<Review> root = reviewCriteriaQuery.from(Review.class);
            reviewCriteriaQuery
                    .select(root)
                    .where(builder.equal(root.get("state").get("name"), "accept"))
                    .orderBy(builder.asc(root.get("id")));
            Query<Review> query = (Query<Review>) entityManager.createQuery(reviewCriteriaQuery);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(query.getResultList());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @PutMapping("/")
    public ResponseEntity<?> createReview(@RequestBody Review review) {
        try {
            reviewsService.create(review);
            adminEmailsService.readAll().forEach((adminEmail) -> {
                emailService.sendEmail(adminEmail.getEmail(),
                        "Пользователь оставил комментарий",
                        EmailFormatter.formatEmailReviewsPut(review));
            });
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body("Review created");
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @PatchMapping("/")
    public ResponseEntity<?> updateReview(@RequestBody Review review) {
        try {
            if (reviewsService.updateNonNull(review, review.getId())) {
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body("Review updated");
            }
            throw new ReviewNotFoundException(Integer.toString(review.getId()));
        } catch (ReviewNotFoundException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(String.format("Review with id [%s] cannot be updated, because it was not found", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/")
    public ResponseEntity<?> deleteRegistration(@RequestBody Integer id) {
        try {
            if (reviewsService.delete(id)) {
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body("Review deleted");
            }
            throw new ReviewNotFoundException(id.toString());
        } catch (ReviewNotFoundException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(String.format("Review with id [%s] cannot be deleted, because it was not found", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }
}
