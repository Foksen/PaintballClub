package ru.mirea.pcmirea.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.mirea.pcmirea.model.User;

import java.util.List;

public interface UserService {
    void create(User user);
    List<User> readAll();
    User read(int id);
    User readByUsername(String username);
    User readCurrentUser();
    boolean update(User user, int id);
    boolean updateNonNull(User user, int id);
    boolean delete(int id);
    UserDetailsService userDetailsService();
}
