package com.example.financemanager.model.entities;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "accounts")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Account {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    protected User user;

    @OneToMany(mappedBy = "account", cascade = CascadeType.PERSIST)
    private List<SpendingRecord> spendingRecordList;

    @Column(name = "currency")
    @Enumerated(EnumType.STRING)
    private Currency currency;


    @Column(name = "personal_money")
    private Double personalMoney;

    @Column(name = "credit_limit")
    private Double creditLimit;


    @Column(name = "is_archived")
    private boolean archived;

    public boolean isArchived() {
        return archived;
    }

    public void setArchived(boolean archived) {
        this.archived = archived;
    }
}
