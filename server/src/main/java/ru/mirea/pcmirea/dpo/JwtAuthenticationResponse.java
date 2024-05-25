package ru.mirea.pcmirea.dpo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Response with token")
public class JwtAuthenticationResponse {
    @Schema(description = "token", example = "$2a$05$cibIEn3TzfSpskY6LVIXcOuZe86vTUOKQexVpUmTexVRJIhcT/Rcm")
    private String token;
}
