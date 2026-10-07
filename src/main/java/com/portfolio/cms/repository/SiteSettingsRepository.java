package com.portfolio.cms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.portfolio.cms.entity.SiteSettings;

public interface SiteSettingsRepository extends JpaRepository<SiteSettings, Long> {}
