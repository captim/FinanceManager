package com.example.financemanager.model.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;
@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column(name = "email")
    @NotBlank(message = "Username is mandatory")
    private String email;

    @Column(name = "login")
    @NotBlank(message = "Login is mandatory")
    private String login;

    @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST)
    private List<IncomeCategory> incomeCategories;

    @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST)
    private List<OutcomeCategory> outcomeCategories;

    @Column(name = "source")
    @Enumerated(EnumType.STRING)
    private RegistrationSource source;

    @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST)
    private List<Account> accounts;
}
