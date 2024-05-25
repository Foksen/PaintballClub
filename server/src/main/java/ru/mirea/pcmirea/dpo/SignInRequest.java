package ru.mirea.pcmirea.dpo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Schema(description = "Sign in request")
public class SignInRequest {
    @Schema(description = "Username", example = "Igor")
    @Size(min = 5, max = 32, message = "Username should be from 5 to 32 chars")
    @NotBlank(message = "Username cannot be empty")
    private String username;

    @Schema(description = "Password", example = "mypassword")
    @Size(min = 5, max = 32, message = "Password should be from 5 to 32 chars")
    @NotBlank(message = "Password cannot be blank")
    private String password;
}
