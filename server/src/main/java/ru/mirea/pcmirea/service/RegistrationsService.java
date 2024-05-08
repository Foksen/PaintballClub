package ru.mirea.pcmirea.service;

import ru.mirea.pcmirea.model.Registration;

import java.util.List;

public interface RegistrationsService {
    void create(Registration registration);
    List<Registration> readAll();
    Registration read(int id);
    boolean update(Registration registration, int id);
    boolean delete(int id);
}
