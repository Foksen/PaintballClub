package ru.mirea.pcmirea.service;

import ru.mirea.pcmirea.model.AdminEmail;

import java.util.List;

public interface AdminEmailsService {
    void create(AdminEmail adminEmail);
    List<AdminEmail> readAll();
    AdminEmail read(int id);
    boolean update(AdminEmail adminEmail, int id);
    boolean delete(int id);
}
