package ru.mirea.pcmirea.conroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mirea.pcmirea.model.Review;
import ru.mirea.pcmirea.service.ReviewsServiceImpl;

@RestController
@RequestMapping("/reviews")
public class ReviewsController {
    @Autowired
    private ReviewsServiceImpl reviewsService;

    @GetMapping("/")
    public ResponseEntity<?> getReviews(@RequestParam(required = false) Integer id) {
        try {
            if (id == null) {
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body(reviewsService.readAll());
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

    @PutMapping("/")
    public ResponseEntity<?> createReview(Review review) {
        try {
            reviewsService.create(review);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body("Review created");
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/")
    public ResponseEntity<?> deleteRegistration(Integer id) {
        try {
            if (reviewsService.delete(id)) {
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body("Review deleted");
            }
            else {
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body(String.format("Review with id [%d] not found", id));
            }
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }
}
