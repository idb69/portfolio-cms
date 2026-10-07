package com.portfolio.cms.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.cms.entity.Blog;
import com.portfolio.cms.repository.BlogRepository;

@RestController
@RequestMapping("/blogs")
public class BlogController extends CrudController<Blog> {

    public BlogController(BlogRepository repository) {
        super(repository);
    }
}