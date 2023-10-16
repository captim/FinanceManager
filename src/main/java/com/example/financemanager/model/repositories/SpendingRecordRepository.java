package com.example.financemanager.model.repositories;

import com.example.financemanager.model.entities.SpendingRecord;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpendingRecordRepository extends CrudRepository<SpendingRecord, Long> {
}
