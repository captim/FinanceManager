package com.example.financemanager.controller;

import com.example.financemanager.model.entities.Account;
import com.example.financemanager.service.api.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping(value="/api/account", consumes="application/json")
    @ResponseBody
    public ResponseEntity<?> createAccount(@RequestBody Account account) {
        accountService.addAccountToCurrentUser(account);
        return ResponseEntity.ok().build();
    }
}
