package ru.mirea.pcmirea.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.mirea.pcmirea.model.User;
import ru.mirea.pcmirea.repository.UsersRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UsersRepository usersRepository;

    @Override
    public void create(User user) {
        if (usersRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("User with the same username is already exists");
        }
        usersRepository.save(user);
    }

    @Override
    public List<User> readAll() {
        return usersRepository.findAll();
    }

    @Override
    public User read(int id) {
        return usersRepository.getReferenceById(id);
    }

    @Override
    public User readByUsername(String username) {
        return usersRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public User readCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return readByUsername(username);
    }

    @Override
    public boolean update(User user, int id) {
        if (usersRepository.existsById(id)) {
            user.setId(id);
            usersRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    public boolean updateNonNull(User user, int id) {
        if (usersRepository.existsById(id)) {
            User newUser = usersRepository.getReferenceById(id);
            if (user.getUsername() != null)
                newUser.setUsername(user.getUsername());
            if (user.getPassword() != null)
                newUser.setPassword(user.getPassword());
            if (user.getRole() != null)
                newUser.setRole(user.getRole());
            usersRepository.save(newUser);
            return true;
        }
        return false;
    }

    @Override
    public boolean delete(int id) {
        if (usersRepository.existsById(id)) {
            usersRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public UserDetailsService userDetailsService() {
        return this::readByUsername;
    }
}
