package com.portfolio.cms.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.cms.entity.SiteSettings;
import com.portfolio.cms.repository.SiteSettingsRepository;

@RestController
@RequestMapping("/settings")
public class SiteSettingsController {

    private final SiteSettingsRepository repository;

    public SiteSettingsController(SiteSettingsRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public SiteSettings get() {

        return repository.findAll()
                .stream()
                .findFirst()
                .orElseGet(() -> repository.save(new SiteSettings()));
    }

    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    public SiteSettings update(@RequestBody SiteSettings settings) {

        SiteSettings current = repository.findAll()
                .stream()
                .findFirst()
                .orElse(null);

        if (current != null) {
            settings.setId(current.getId());
        }

        return repository.save(settings);
    }
}