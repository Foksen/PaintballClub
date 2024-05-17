package ru.mirea.pcmirea;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import ru.mirea.pcmirea.model.Registration;
import ru.mirea.pcmirea.repository.RegistrationsRepository;
import ru.mirea.pcmirea.service.RegistrationsService;
import ru.mirea.pcmirea.service.RegistrationsServiceImpl;

import java.util.List;

@ExtendWith(MockitoExtension.class)
public class RegistrationsServiceTest {
    @Mock
    private RegistrationsRepository registrationsRepository;
    @Captor
    private ArgumentCaptor<Registration> captor;

    @Test
    void getRegistration() {
        String registrationName1 = "Test registration1";
        String registrationName2 = "Test registration2";
        Registration registration1 = new Registration();
        Registration registration2 = new Registration();
        registration1.setName(registrationName1);
        registration2.setName(registrationName2);
        Mockito.when(registrationsRepository.findAll()).thenReturn(List.of(registration1, registration2));
        RegistrationsService registrationsService = new RegistrationsServiceImpl(registrationsRepository);
        Assertions.assertEquals(2, registrationsService.readAll().size());
        Assertions.assertEquals(registrationName1, registrationsService.readAll().getFirst().getName());
    }

    @Test
    void createRegistration() {
        String registrationName = "Test registration";
        Registration registration = new Registration();
        registration.setName(registrationName);
        RegistrationsService registrationsService = new RegistrationsServiceImpl(registrationsRepository);
        registrationsService.create(registration);
        Mockito.verify(registrationsRepository).save(captor.capture());
        Registration captured = captor.getValue();
        Assertions.assertEquals(registrationName, captured.getName());
    }
}
