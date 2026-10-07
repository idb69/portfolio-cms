package com.portfolio.cms.repository;

import org.springframework.data.jpa.repository.JpaRepository; 
import com.portfolio.cms.entity.Testimonial;

public interface TestimonialRepository extends JpaRepository<Testimonial,Long> { 
	
}
