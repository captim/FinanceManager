package com.example.financemanager.model.repositories;

import com.example.financemanager.model.entities.OutcomeCategory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OutcomeCategoryRepository extends CrudRepository<OutcomeCategory, Long> {
}
