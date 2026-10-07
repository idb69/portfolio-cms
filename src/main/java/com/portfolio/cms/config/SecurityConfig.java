package com.portfolio.cms.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import com.portfolio.cms.repository.UserRepository;
import com.portfolio.cms.security.JwtAuthFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    // Password Encoder
    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    // Load User from Database
    @Bean
    public UserDetailsService users(UserRepository repo) {

        return username -> repo.findByUsername(username)
                .map(user -> User.withUsername(user.getUsername())
                        .password(user.getPassword())
                        .roles(user.getRole())
                        .build())
                .orElseThrow(
                        () -> new UsernameNotFoundException(
                                "User not found: " + username
                        )
                );
    }

    // Security Configuration
    @Bean
    public SecurityFilterChain chain(
            HttpSecurity http,
            JwtAuthFilter jwtAuthFilter) throws Exception {

        http
            // Disable CSRF for REST API
            .csrf(csrf -> csrf.disable())

            // CORS Configuration
            .cors(cors -> cors.configurationSource(request -> {

                CorsConfiguration config = new CorsConfiguration();

                config.setAllowedOriginPatterns(
                        List.of("*")
                );

                config.setAllowedMethods(
                        List.of(
                                "GET",
                                "POST",
                                "PUT",
                                "DELETE",
                                "OPTIONS"
                        )
                );

                config.setAllowedHeaders(
                        List.of("*")
                );

                config.setAllowCredentials(true);

                return config;
            }))

            // JWT based authentication
            .sessionManagement(session ->
                    session.sessionCreationPolicy(
                            SessionCreationPolicy.STATELESS
                    )
            )

            // Authorization
            .authorizeHttpRequests(auth -> auth

                    // Authentication APIs
                    .requestMatchers("/auth/**").permitAll()

                    // Public APIs
                    .requestMatchers("/contact").permitAll()
                    .requestMatchers("/settings").permitAll()
                    .requestMatchers("/upload/image").authenticated()
                    .requestMatchers("/uploads/**").permitAll()

                    .requestMatchers("/about").permitAll()
                    .requestMatchers("/skills").permitAll()
                    .requestMatchers("/projects").permitAll()
                    .requestMatchers("/blogs").permitAll()
                    .requestMatchers("/experience").permitAll()
                    .requestMatchers("/testimonials").permitAll()
                    .requestMatchers("/services").permitAll()

                    // Everything else requires authentication
                    .anyRequest().authenticated()
            )

            // JWT Filter
            .addFilterBefore(
                    jwtAuthFilter,
                    UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}