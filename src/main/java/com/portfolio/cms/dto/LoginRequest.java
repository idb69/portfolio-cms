package com.portfolio.cms.dto;

public record LoginRequest(
        String username,
        String password
) {
}