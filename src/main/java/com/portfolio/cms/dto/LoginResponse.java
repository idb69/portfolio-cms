package com.portfolio.cms.dto;

public record LoginResponse(
        String token,
        String username,
        String role
) {
}