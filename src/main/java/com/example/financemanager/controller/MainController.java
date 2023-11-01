package com.example.financemanager.controller;

import com.example.financemanager.model.entities.User;
import com.example.financemanager.service.api.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.AccessDeniedException;

@RestController
public class MainController {

    private final UserService userService;

    public MainController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/api/checkAccess")
    @ResponseBody
    public User index() throws AccessDeniedException {
        return userService.getCurrentUserForStorage();
    }

    @GetMapping("/welcome")
    public String welcome() {

        return "Welcome to Finance Manager!";
    }
}
