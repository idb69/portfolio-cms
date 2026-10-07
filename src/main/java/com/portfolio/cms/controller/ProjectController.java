package com.portfolio.cms.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.cms.entity.Project;
import com.portfolio.cms.repository.ProjectRepository;

@RestController
@RequestMapping("/projects")
public class ProjectController extends CrudController<Project> {

    public ProjectController(ProjectRepository repository) {
        super(repository);
    }
}