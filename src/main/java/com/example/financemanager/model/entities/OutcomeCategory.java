package com.example.financemanager.model.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "outcome_categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OutcomeCategory extends Categories {
    @OneToMany(mappedBy = "outcomeCategory", cascade = CascadeType.PERSIST)
    private List<SpendingRecord> spendingRecordList;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    protected User user;
}
