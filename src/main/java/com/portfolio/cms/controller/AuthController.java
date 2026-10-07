package com.portfolio.cms.controller;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.cms.dto.LoginRequest;
import com.portfolio.cms.dto.LoginResponse;
import com.portfolio.cms.repository.UserRepository;
import com.portfolio.cms.security.JwtService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public AuthController(
            AuthenticationManager authenticationManager,
            JwtService jwtService,
            UserRepository userRepository) {

        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    // POST /auth/login
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        // Authenticate username and password
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.username(),
                        request.password()
                )
        );

        // Find user from database
        var user = userRepository
                .findByUsername(request.username())
                .orElseThrow();

        // Generate JWT
        String token = jwtService.generate(user.getUsername());

        return new LoginResponse(
                token,
                user.getUsername(),
                user.getRole()
        );
    }

    // POST /auth/refresh
    @PostMapping("/refresh")
    public LoginResponse refresh(
            @RequestHeader("Authorization") String authorizationHeader) {

        // Check Authorization header
        if (authorizationHeader == null
                || !authorizationHeader.startsWith("Bearer ")) {

            throw new IllegalArgumentException(
                    "Invalid Authorization header"
            );
        }

        // Remove "Bearer "
        String token = authorizationHeader.substring(7);

        // Get username from JWT
        String username = jwtService.username(token);

        // Find user
        var user = userRepository
                .findByUsername(username)
                .orElseThrow();

        // Generate new JWT
        String newToken = jwtService.generate(username);

        return new LoginResponse(
                newToken,
                username,
                user.getRole()
        );
    }
}