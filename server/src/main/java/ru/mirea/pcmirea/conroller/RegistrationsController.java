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
import ru.mirea.pcmirea.exception.RegistrationNotFoundException;
import ru.mirea.pcmirea.model.Registration;
import ru.mirea.pcmirea.service.AdminEmailsService;
import ru.mirea.pcmirea.service.EmailService;
import ru.mirea.pcmirea.service.RegistrationsService;
import ru.mirea.pcmirea.util.EmailFormatter;

@RestController()
@RequestMapping("/registrations")
@CrossOrigin
public class RegistrationsController {
    @Autowired
    private RegistrationsService registrationsService;

    @Autowired
    private AdminEmailsService adminEmailsService;

    @Autowired
    private EmailService emailService;

    @PersistenceContext
    private EntityManager entityManager;

    @GetMapping("/")
    public ResponseEntity<?> getRegistrations(@RequestParam(required = false) Integer id) {
        try {
            if (id == null) {
                CriteriaBuilder builder = entityManager.getCriteriaBuilder();
                CriteriaQuery<Registration> registrationCriteriaQuery = builder.createQuery(Registration.class);
                Root<Registration> root = registrationCriteriaQuery.from(Registration.class);
                registrationCriteriaQuery
                        .select(root)
                        .orderBy(builder.asc(root.get("id")));
                Query<Registration> query = (Query<Registration>) entityManager.createQuery(registrationCriteriaQuery);
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body(query.getResultList());
            }
            else {
                Registration registration = registrationsService.read(1);
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body(registrationsService.read(id));
            }
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @PutMapping("/")
    public ResponseEntity<?> createRegistration(@RequestBody Registration registration) {
        try {
            registrationsService.create(registration);
            adminEmailsService.readAll().forEach((adminEmail) -> {
                emailService.sendEmail(adminEmail.getEmail(),
                        "Пользователь хочет записаться на игру",
                        EmailFormatter.formatEmailRegistrationsPut(registration));
            });
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body("Registration created");
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @PatchMapping("/")
    public ResponseEntity<?> updateRegistration(@RequestBody Registration registration) {
        try {
            if (registrationsService.updateNonNull(registration, registration.getId())) {
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body("Registration updated");
            }
            throw new RegistrationNotFoundException(Integer.toString(registration.getId()));
        } catch (RegistrationNotFoundException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(String.format("Registration with id [%s] cannot be updated, because it was not found", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/")
    public ResponseEntity<?> deleteRegistration(@RequestBody Integer id) {
        try {
            if (registrationsService.delete(id)) {
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body("Registration deleted");
            }
            else {
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body(String.format("Registration with id [%d] not found", id));
            }
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }
}
