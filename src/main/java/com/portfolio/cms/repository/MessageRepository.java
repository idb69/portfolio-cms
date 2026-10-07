package com.portfolio.cms.repository;

import org.springframework.data.jpa.repository.JpaRepository; 
import com.portfolio.cms.entity.Message;

public interface MessageRepository extends JpaRepository<Message,Long> { 
	
}
