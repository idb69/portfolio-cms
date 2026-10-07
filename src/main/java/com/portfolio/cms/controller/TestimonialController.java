package com.portfolio.cms.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.cms.entity.Testimonial;
import com.portfolio.cms.repository.TestimonialRepository;

@RestController
@RequestMapping("/testimonials")
public class TestimonialController
        extends CrudController<Testimonial> {

    public TestimonialController(
            TestimonialRepository repository) {

        super(repository);
    }
}