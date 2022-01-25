package com.stochnialek.newagebankis.model.repositories;

import com.stochnialek.newagebankis.model.entities.LoginCredensials;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginCredensialsRepository extends JpaRepository<LoginCredensials, Long> {
    boolean existsLoginCredensialsByNameAndPassword(String name, String password);
}
