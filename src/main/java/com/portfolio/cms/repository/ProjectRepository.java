package com.portfolio.cms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.portfolio.cms.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}