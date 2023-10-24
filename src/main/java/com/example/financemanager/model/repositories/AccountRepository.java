package com.example.financemanager.model.repositories;

import com.example.financemanager.model.entities.Account;
import com.example.financemanager.model.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends CrudRepository<Account, Long> {
    List<Account> findAllByUser(User user);
}
