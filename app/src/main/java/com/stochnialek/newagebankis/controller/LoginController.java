package com.stochnialek.newagebankis.controller;

import com.stochnialek.newagebankis.model.entities.LoginCredensials;
import com.stochnialek.newagebankis.model.repositories.LoginCredensialsRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class LoginController {

    private final LoginCredensialsRepository repository;

    public LoginController(LoginCredensialsRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/login")
    boolean checkLoginCredensials(@RequestBody LoginCredensials newLoginCredensials) {
        return repository.existsLoginCredensialsByNameAndPassword(newLoginCredensials.getName(), newLoginCredensials.getPassword());
    }

    @PostMapping("/register")
    LoginCredensials newLoginCredensials(@RequestBody LoginCredensials newLoginCredensials) {
        return repository.save(newLoginCredensials);
    }
}
