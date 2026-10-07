package com.portfolio.cms.repository;

import org.springframework.data.jpa.repository.JpaRepository; 
import com.portfolio.cms.entity.Experience;

public interface ExperienceRepository extends JpaRepository<Experience,Long> { 
	
	
}
