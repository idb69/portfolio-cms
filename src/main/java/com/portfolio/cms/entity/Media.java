package com.portfolio.cms.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "media")
public class Media {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String originalName;

    @Column(nullable = false)
    private String storedName;

    @Column(nullable = false)
    private String url;

    private String contentType;

    private Long size;

    public Media() {
    }

    // ID
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Original Name
    public String getOriginalName() {
        return originalName;
    }

    public void setOriginalName(String originalName) {
        this.originalName = originalName;
    }

    // Stored Name
    public String getStoredName() {
        return storedName;
    }

    public void setStoredName(String storedName) {
        this.storedName = storedName;
    }

    // URL
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    // Content Type
    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    // Size
    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }
}