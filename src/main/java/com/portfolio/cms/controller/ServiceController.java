package com.portfolio.cms.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.cms.entity.Service;
import com.portfolio.cms.repository.ServiceRepository;

@RestController
@RequestMapping("/services")
public class ServiceController
        extends CrudController<Service> {

    public ServiceController(
            ServiceRepository repository) {

        super(repository);
    }
}