package com.portfolio.cms.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.cms.entity.Skill;
import com.portfolio.cms.repository.SkillRepository;

@RestController
@RequestMapping("/skills")
public class SkillController extends CrudController<Skill> {

    public SkillController(SkillRepository repository) {
        super(repository);
    }
}