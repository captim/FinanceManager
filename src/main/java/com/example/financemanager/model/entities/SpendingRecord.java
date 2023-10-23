package com.example.financemanager.model.entities;

import lombok.*;

import javax.persistence.*;
import java.sql.Date;
@Entity
@Table(name = "spending_records")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SpendingRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "income_category_id")
    private Account incomeCategory;

    @ManyToOne
    @JoinColumn(name = "outcome_category_id")
    private OutcomeCategory outcomeCategory;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    @Column(name = "date")
    private Date date;
}
