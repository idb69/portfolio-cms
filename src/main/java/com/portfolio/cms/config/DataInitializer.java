package com.portfolio.cms.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.portfolio.cms.entity.SiteSettings;
import com.portfolio.cms.entity.User;
import com.portfolio.cms.repository.SiteSettingsRepository;
import com.portfolio.cms.repository.UserRepository;

@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner init(UserRepository users, SiteSettingsRepository settings, PasswordEncoder encoder,
                           @Value("${app.admin.username:admin}") String adminUsername,
                           @Value("${app.admin.password:admin123}") String adminPassword) {
        return args -> {
            if (users.count() == 0) {
                User user = new User();
                user.setUsername(adminUsername);
                user.setPassword(encoder.encode(adminPassword));
                user.setRole("ADMIN");
                users.save(user);
            }
            if (settings.count() == 0) {
                SiteSettings s = new SiteSettings();
                s.setSiteName("Portfolio CMS");
                s.setHeroGreeting("Hello, I am");
                s.setHeroTitle("Building modern digital experiences.");
                s.setHeroDescription("MBA student specializing in Data Analytics & Visualization, passionate about Java, Spring Boot, web development and cloud technologies.");
                s.setAboutEyebrow("About"); s.setAboutTitle("A developer focused on practical solutions.");
                s.setAboutText("I enjoy creating useful software with clean APIs, databases and responsive interfaces.");
                s.setSkillsTitle("Technologies I work with"); s.setProjectsTitle("Selected work");
                s.setProjectsText("Projects are managed from the CMS admin panel.");
                s.setExperienceTitle("Experience & learning journey"); s.setBlogTitle("Latest articles");
                s.setServicesTitle("What I can build"); s.setContactTitle("Let's build something useful.");
                s.setContactText("Send a message through the portfolio contact form.");
                settings.save(s);
            }
        };
    }
}
