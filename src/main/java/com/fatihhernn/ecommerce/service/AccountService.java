package com.fatihhernn.ecommerce.service;

import com.fatihhernn.ecommerce.entities.Account;

import java.util.List;
import java.util.Optional;

public interface AccountService {
    
    List<Account> findAll();
    
    Optional<Account> findById(Long id);
    
    Optional<Account> findByAccountNumber(String accountNumber);
    
    Account save(Account account);
    
    Account update(Long id, Account account);
    
    void deleteById(Long id);
}
