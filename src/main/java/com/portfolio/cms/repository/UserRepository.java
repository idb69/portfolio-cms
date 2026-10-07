package com.portfolio.cms.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portfolio.cms.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
}