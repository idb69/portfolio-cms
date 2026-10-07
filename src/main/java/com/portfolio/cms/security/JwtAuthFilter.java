package com.portfolio.cms.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public JwtAuthFilter(
            JwtService jwtService,
            UserDetailsService userDetailsService) {

        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String authorizationHeader =
                request.getHeader("Authorization");

        // Check Bearer token
        if (authorizationHeader != null
                && authorizationHeader.startsWith("Bearer ")) {

            try {

                String token =
                        authorizationHeader.substring(7);

                // Extract username from JWT
                String username =
                        jwtService.username(token);

                // Authenticate only if no authentication exists
                if (username != null
                        && SecurityContextHolder
                                .getContext()
                                .getAuthentication() == null) {

                    UserDetails userDetails =
                            userDetailsService
                                    .loadUserByUsername(username);

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(authentication);
                }

            } catch (Exception e) {
                // Invalid/expired JWT
                // Continue request without authentication
            }
        }

        filterChain.doFilter(request, response);
    }
}