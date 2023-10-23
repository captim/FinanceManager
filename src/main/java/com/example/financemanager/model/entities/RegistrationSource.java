package com.example.financemanager.model.entities;

public enum RegistrationSource {
    GITHUB("github"),
    GOOGLE("google");

    public String getName() {
        return name;
    }

    private final String name;

    RegistrationSource(String name) {
        this.name = name;
    }
}
