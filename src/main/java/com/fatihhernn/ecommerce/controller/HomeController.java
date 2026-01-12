
package com.fatihhernn.ecommerce.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Spring Boot backend is running successfully 🚀";
    }

    @GetMapping("/health")
    public String health() {
        return "Application health is OK ✅";
    }
} 
