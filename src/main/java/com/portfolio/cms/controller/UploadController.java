package com.portfolio.cms.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.portfolio.cms.entity.Media;
import com.portfolio.cms.repository.MediaRepository;

@RestController
@RequestMapping("/upload")
public class UploadController {

    private final MediaRepository repository;
    private final Path uploadDirectory;

    public UploadController(
            MediaRepository repository,
            @Value("${app.upload-dir}") String uploadDir) {

        this.repository = repository;
        this.uploadDirectory = Paths.get(uploadDir);

        try {
            Files.createDirectories(uploadDirectory);
        } catch (Exception e) {
            throw new RuntimeException(
                    "Could not create upload directory",
                    e
            );
        }
    }

    // POST /upload/image
    @PostMapping(
            value = "/image",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    @PreAuthorize("hasRole('ADMIN')")
    public Media upload(
            @RequestParam("file") MultipartFile file) throws Exception {

        // Check empty file
        if (file.isEmpty()) {
            throw new IllegalArgumentException(
                    "Please select a file to upload"
            );
        }

        // Get original filename safely
        String originalName = Objects.requireNonNull(
                file.getOriginalFilename()
        );

        // Extract only filename, preventing path traversal
        String cleanFileName = Paths.get(originalName)
                .getFileName()
                .toString();

        // Generate unique stored filename
        String storedName =
                UUID.randomUUID() + "-" + cleanFileName;

        // Final file path
        Path targetPath = uploadDirectory.resolve(storedName);

        // Save file
        Files.copy(
                file.getInputStream(),
                targetPath,
                StandardCopyOption.REPLACE_EXISTING
        );

        // Save media information in database
        Media media = new Media();

        media.setOriginalName(cleanFileName);
        media.setStoredName(storedName);
        media.setUrl("/uploads/" + storedName);
        media.setContentType(file.getContentType());
        media.setSize(file.getSize());

        return repository.save(media);
    }
}