package ru.mirea.pcmirea;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import ru.mirea.pcmirea.model.AdminEmail;
import ru.mirea.pcmirea.repository.AdminEmailsRepository;
import ru.mirea.pcmirea.service.AdminEmailsService;
import ru.mirea.pcmirea.service.AdminEmailsServiceImpl;

import java.util.List;

@ExtendWith(MockitoExtension.class)
public class AdminEmailsServiceTest {
    @Mock
    private AdminEmailsRepository adminEmailsRepository;
    @Captor
    private ArgumentCaptor<AdminEmail> captor;

    @Test
    void getAdminEmail() {
        String email1 = "Test email1";
        String email2 = "Test email2";
        AdminEmail adminEmail1 = new AdminEmail();
        AdminEmail adminEmail2 = new AdminEmail();
        adminEmail1.setEmail(email1);
        adminEmail2.setEmail(email2);
        Mockito.when(adminEmailsRepository.findAll()).thenReturn(List.of(adminEmail1, adminEmail2));
        AdminEmailsService adminEmailsService = new AdminEmailsServiceImpl(adminEmailsRepository);
        Assertions.assertEquals(2, adminEmailsService.readAll().size());
        Assertions.assertEquals(email1, adminEmailsService.readAll().getFirst().getEmail());
    }

    @Test
    void createAdminEmail() {
        String email = "Test email";
        AdminEmail adminEmail = new AdminEmail();
        adminEmail.setEmail(email);
        AdminEmailsService adminEmailsService = new AdminEmailsServiceImpl(adminEmailsRepository);
        adminEmailsService.create(adminEmail);
        Mockito.verify(adminEmailsRepository).save(captor.capture());
        AdminEmail captured = captor.getValue();
        Assertions.assertEquals(email, captured.getEmail());
    }
}
