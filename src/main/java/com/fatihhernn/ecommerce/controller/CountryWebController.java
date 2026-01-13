package com.fatihhernn.ecommerce.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CountryWebController {

    @GetMapping("/countries")
    public String countriesPage() {
        return "countries";
    }
}
