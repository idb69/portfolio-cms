package com.portfolio.cms.repository;

import org.springframework.data.jpa.repository.JpaRepository; 
import com.portfolio.cms.entity.Service;

public interface ServiceRepository extends JpaRepository<Service,Long> { 
	
}
