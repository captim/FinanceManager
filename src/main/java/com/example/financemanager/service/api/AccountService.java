package com.example.financemanager.service.api;

import com.example.financemanager.model.entities.Account;

public interface AccountService {
    void addAccountToCurrentUser(Account account);
}
