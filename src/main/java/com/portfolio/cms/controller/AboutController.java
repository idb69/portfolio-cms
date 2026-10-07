package com.portfolio.cms.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.cms.entity.About;
import com.portfolio.cms.repository.AboutRepository;

@RestController
@RequestMapping("/about")
public class AboutController {

    private final AboutRepository repository;

    public AboutController(AboutRepository repository) {
        this.repository = repository;
    }

    // GET /about
    @GetMapping
    public About get() {

        return repository.findAll()
                .stream()
                .findFirst()
                .orElse(null);
    }

    // PUT /about
    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    public About put(@RequestBody About about) {

        // If ID is not provided, update existing About record
        if (about.getId() == null) {

            var old = repository.findAll()
                    .stream()
                    .findFirst();

            if (old.isPresent()) {
                about.setId(old.get().getId());
            }
        }

        return repository.save(about);
    }
}