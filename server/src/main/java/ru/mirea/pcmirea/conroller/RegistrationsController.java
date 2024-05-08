package ru.mirea.pcmirea.conroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mirea.pcmirea.model.Registration;
import ru.mirea.pcmirea.service.RegistrationsServiceImpl;

@RestController()
@RequestMapping("/registrations")
public class RegistrationsController {
    @Autowired
    private RegistrationsServiceImpl registrationsService;

    @GetMapping("/")
    public ResponseEntity<?> getRegistrations(@RequestParam(required = false) Integer id) {
        try {
            if (id == null) {
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body(registrationsService.readAll());
            }
            else {
                Registration registration = registrationsService.read(1);
                System.out.printf(registration.getName());
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
    public ResponseEntity<?> createRegistration(Registration registration) {
        try {
            registrationsService.create(registration);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body("Registration created");
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/")
    public ResponseEntity<?> deleteRegistration(Integer id) {
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
