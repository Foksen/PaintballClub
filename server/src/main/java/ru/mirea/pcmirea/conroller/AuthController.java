package ru.mirea.pcmirea.conroller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mirea.pcmirea.dpo.JwtAuthenticationResponse;
import ru.mirea.pcmirea.dpo.SignInRequest;
import ru.mirea.pcmirea.service.AuthenticationService;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {
    @Autowired
    private AuthenticationService authenticationService;

    @GetMapping("/is-authenticated")
    public ResponseEntity<?> isAuthenticated() {
        try {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(null);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/sign-in")
    public JwtAuthenticationResponse signIn(@RequestBody @Valid SignInRequest request) {
        return authenticationService.signIn(request);
    }
}
