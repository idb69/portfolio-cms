package com.portfolio.cms.controller;

import java.nio.file.*;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.portfolio.cms.entity.Media;
import com.portfolio.cms.repository.MediaRepository;

@RestController
@RequestMapping("/media")
public class MediaController {
    private final MediaRepository repository;
    private final Path uploadDirectory;
    public MediaController(MediaRepository repository, @Value("${app.upload-dir}") String dir) {
        this.repository = repository; this.uploadDirectory = Paths.get(dir);
    }
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Media> all() { return repository.findAll(); }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id) throws Exception {
        Media media = repository.findById(id).orElseThrow(() -> new RuntimeException("Media not found: " + id));
        Files.deleteIfExists(uploadDirectory.resolve(media.getStoredName()).normalize());
        repository.deleteById(id);
    }
}
