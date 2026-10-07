package com.portfolio.cms.repository;

import org.springframework.data.jpa.repository.JpaRepository; 
import com.portfolio.cms.entity.Skill;

public interface SkillRepository extends JpaRepository<Skill,Long> { }
