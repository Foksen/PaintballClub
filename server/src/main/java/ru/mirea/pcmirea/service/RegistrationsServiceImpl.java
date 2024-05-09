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
        return registrationsRepository.findAllByOrderByIdAsc();
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
    public boolean updateNonNull(Registration registration, int id) {
        if (registrationsRepository.existsById(id)) {
            Registration newRegistration = registrationsRepository.getReferenceById(id);
            if (registration.getName() != null)
                newRegistration.setName(registration.getName());
            if (registration.getEmail() != null)
                newRegistration.setEmail(registration.getEmail());
            if (registration.getDate() != null)
                newRegistration.setDate(registration.getDate());
            if (registration.getComment() != null)
                newRegistration.setComment(registration.getComment());
            if (registration.getPacket() != null)
                newRegistration.setPacket(registration.getPacket());
            if (registration.getState() != null)
                newRegistration.setState(registration.getState());
            registrationsRepository.save(newRegistration);
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
