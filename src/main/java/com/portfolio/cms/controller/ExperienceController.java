package com.portfolio.cms.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.cms.entity.Experience;
import com.portfolio.cms.repository.ExperienceRepository;

@RestController
@RequestMapping("/experience")
public class ExperienceController
        extends CrudController<Experience> {

    public ExperienceController(
            ExperienceRepository repository) {

        super(repository);
    }
}