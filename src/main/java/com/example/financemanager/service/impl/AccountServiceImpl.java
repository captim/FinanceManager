package com.example.financemanager.service.impl;

import com.example.financemanager.model.entities.Account;
import com.example.financemanager.model.entities.User;
import com.example.financemanager.model.repositories.AccountRepository;
import com.example.financemanager.model.repositories.UserRepository;
import com.example.financemanager.service.api.AccountService;
import com.example.financemanager.service.api.UserService;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl implements AccountService {
    
    private final AccountRepository accountRepository;
    private final UserService userService;
    
    public AccountServiceImpl(AccountRepository accountRepository, UserService userService) {
        this.accountRepository = accountRepository;
        this.userService = userService;
    }
    
    @Override
    public void addAccountToCurrentUser(Account account) {
        User user = userService.getCurrentUser().orElseThrow(() -> new RuntimeException("User not found"));
        account.setUser(user);
        accountRepository.save(account);
    }
}