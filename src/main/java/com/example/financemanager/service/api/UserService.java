package com.example.financemanager.service.api;

import com.example.financemanager.model.entities.User;

import java.util.Optional;

public interface UserService {
    Optional<User> findUserByEmail(String email);
    Optional<User> findUserByLogin(String login);
    void save(User user);
    Optional<User> getCurrentUser();
}
