package com.portfolio.cms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portfolio.cms.entity.Blog;

public interface BlogRepository extends JpaRepository<Blog, Long> {
	
}
