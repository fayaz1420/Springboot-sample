package com.fatihhernn.ecommerce.controller;

import com.fatihhernn.ecommerce.dao.CountryRepository;
import com.fatihhernn.ecommerce.entities.Country;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/countries")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class CountryRestController {

    private final CountryRepository countryRepository;

    public CountryRestController(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    @GetMapping
    public List<Country> list() {
        return countryRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Country> create(@RequestBody Country country) {
        // Validate input
        if (country.getCode() == null || country.getCode().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        if (country.getName() == null || country.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        // Normalize code to uppercase
        country.setCode(country.getCode().trim().toUpperCase());
        country.setName(country.getName().trim());
        
        Country saved = countryRepository.save(country);
        return ResponseEntity.created(URI.create("/api/countries/" + saved.getId())).body(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Country> getById(@PathVariable Integer id) {
        return countryRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
