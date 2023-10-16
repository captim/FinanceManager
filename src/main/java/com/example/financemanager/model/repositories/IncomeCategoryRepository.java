package com.example.financemanager.model.repositories;

import com.example.financemanager.model.entities.IncomeCategory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IncomeCategoryRepository extends CrudRepository<IncomeCategory, Long> {
}
