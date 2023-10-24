package com.example.financemanager.service.api;

import com.example.financemanager.model.entities.Account;

import java.util.List;

public interface AccountService {
    void addAccountToCurrentUser(Account account);
    List<Account> getAccountsByCurrentUser();
}
