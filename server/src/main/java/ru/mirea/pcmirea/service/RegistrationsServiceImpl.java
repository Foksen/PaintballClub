package ru.mirea.pcmirea.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.mirea.pcmirea.model.Registration;
import ru.mirea.pcmirea.repository.RegistrationsRepository;

import java.util.List;

@Service
@Slf4j
public class RegistrationsServiceImpl implements RegistrationsService {
    private final RegistrationsRepository registrationsRepository;

    public RegistrationsServiceImpl(RegistrationsRepository registrationsRepository) {
        this.registrationsRepository = registrationsRepository;
    }


    @Override
    public void create(Registration registration) {
        registrationsRepository.save(registration);
    }

    @Override
    public List<Registration> readAll() {
        return registrationsRepository.findAll();
    }

    @Override
    public Registration read(int id) {
        return registrationsRepository.getReferenceById(id);
    }

    @Override
    public boolean update(Registration registration, int id) {
        if (registrationsRepository.existsById(id)) {
            registration.setId(id);
            registrationsRepository.save(registration);
            return true;
        }
        return false;
    }

    @Override
    public boolean delete(int id) {
        if (registrationsRepository.existsById(id)) {
            registrationsRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
