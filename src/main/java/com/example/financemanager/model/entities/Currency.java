package com.example.financemanager.model.entities;

public enum Currency {
    HRN("hryvnia", "₴"),
    USD("dollar", "$"),
    EUR("euro", "€");
    public final String name;
    public final String symbol;
    Currency(String name, String symbol) {
        this.name = name;
        this.symbol = symbol;
    }
}
