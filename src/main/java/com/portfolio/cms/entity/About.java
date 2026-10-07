package com.portfolio.cms.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "about")
public class About {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Tumhare existing fields yahan rahenge
    // Example:
    private String title;
    private String description;
    private String imageUrl;

    public About() {
    }

    // ID
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Existing fields ke getters/setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImageUrl() { return imageUrl; }

    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}