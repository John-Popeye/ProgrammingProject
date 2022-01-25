package com.stochnialek.newagebankis.controller;

import com.stochnialek.newagebankis.model.entities.BankAccount;
import com.stochnialek.newagebankis.model.repositories.BankAccountRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BankAccountController {

    private final BankAccountRepository repository;

    public BankAccountController(BankAccountRepository repository) {
        this.repository = repository;
    }


    @GetMapping("/accounts")
    public List<BankAccount> getAccounts (){
        return repository.findAll();
    }

    @PostMapping("/account")
    public BankAccount createAccount(@RequestBody BankAccount bankAccount){
        return repository.save(bankAccount);
    }
    @PostMapping("/account/{id}")
    public BankAccount updateAccountStatus(@PathVariable Long id, @RequestBody BankAccount bankAccount){
        BankAccount changedEntity = repository.getById(id);
        changedEntity.setCurrentValue(bankAccount.getCurrentValue());
        return repository.save(changedEntity);
    }
}
