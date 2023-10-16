package com.example.financemanager.model.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "income_categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IncomeCategory extends Categories {
    @OneToMany(mappedBy = "incomeCategory", cascade = CascadeType.PERSIST)
    private List<SpendingRecord> spendingRecordList;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    protected User user;
}
