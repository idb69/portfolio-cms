package com.portfolio.cms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portfolio.cms.entity.Media;

public interface MediaRepository extends JpaRepository<Media, Long> {
}