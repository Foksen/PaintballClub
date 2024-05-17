package ru.mirea.pcmirea.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.mirea.pcmirea.model.AdminEmail;
import ru.mirea.pcmirea.repository.AdminEmailsRepository;

import java.util.List;

@Service
@Slf4j
@Transactional
public class AdminEmailsServiceImpl implements AdminEmailsService {
    private final AdminEmailsRepository adminEmailsRepository;

    public AdminEmailsServiceImpl(AdminEmailsRepository adminEmailsRepository) {
        this.adminEmailsRepository = adminEmailsRepository;
    }

    @Override
    public void create(AdminEmail adminEmail) {
        adminEmailsRepository.save(adminEmail);
    }

    @Override
    public List<AdminEmail> readAll() {
        return adminEmailsRepository.findAll();
    }

    @Override
    public AdminEmail read(int id) {
        return adminEmailsRepository.getReferenceById(id);
    }

    @Override
    public boolean update(AdminEmail adminEmail, int id) {
        if (adminEmailsRepository.existsById(id)) {
            adminEmail.setId(id);
            adminEmailsRepository.save(adminEmail);
            return true;
        }
        return false;
    }

    @Override
    public boolean delete(int id) {
        if (adminEmailsRepository.existsById(id)) {
            adminEmailsRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
