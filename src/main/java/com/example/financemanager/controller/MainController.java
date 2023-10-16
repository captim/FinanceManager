package com.example.financemanager.controller;

import com.example.financemanager.model.repositories.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    private final UserRepository userRepository;

    public MainController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @GetMapping("/")
    public String index() {
        StringBuilder output = new StringBuilder("Hello World!!!\n");
        return output.toString();
    }
    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome to Finance Manager!";
    }
}
