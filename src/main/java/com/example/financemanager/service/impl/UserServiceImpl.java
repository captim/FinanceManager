package com.example.financemanager.service.impl;

import com.example.financemanager.model.entities.User;
import com.example.financemanager.model.repositories.UserRepository;
import com.example.financemanager.service.api.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> findUserByLogin(String login) {
        return userRepository.findByLogin(login);
    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public Optional<User> getCurrentUser() {
        String login = ((OAuth2AuthenticationToken) SecurityContextHolder.getContext().getAuthentication()).getPrincipal().getAttribute("login");
        return userRepository.findByLogin(login);
    }

    @Override
    public User getCurrentUserForStorage() throws AccessDeniedException {
        User user = getCurrentUser().orElseThrow(() -> new AccessDeniedException("User not found"));
        user.setIncomeCategories(null);
        user.setOutcomeCategories(null);
        user.setAccounts(null);
        return user;
    }
}
