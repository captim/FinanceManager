package com.example.financemanager.controller;

import com.example.financemanager.model.entities.Account;
import com.example.financemanager.service.api.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping(value="/api/accounts")
    @ResponseBody
    public ResponseEntity<?> getAccounts() {
        return ResponseEntity.ok(accountService.getAccountsByCurrentUser());
    }

    @DeleteMapping(value="/api/account/{id}")
    @ResponseBody
    public ResponseEntity<?> deleteAccount(@PathVariable("id") Long id) {
        accountService.deleteAccount(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value="/api/account", consumes="application/json")
    @ResponseBody
    public ResponseEntity<?> updateAccount(@RequestBody Account account) {
        accountService.updateAccount(account);
        return ResponseEntity.ok().build();
    }
}
