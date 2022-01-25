package com.stochnialek.newagebankis.model.repositories;

import com.stochnialek.newagebankis.model.entities.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankAccountRepository extends JpaRepository <BankAccount, Long> {
}
