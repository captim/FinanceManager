package com.example.financemanager.controller;

import com.example.financemanager.model.entities.User;
import com.example.financemanager.model.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping(value = "/user", consumes = "application/json")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        userRepository.save(user);
        return ResponseEntity.ok().build();
    }
    @GetMapping(value = "/users", produces = "application/json")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok().body(userRepository.findAll());
    }
}
