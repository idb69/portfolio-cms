package com.portfolio.cms.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "site_settings")
public class SiteSettings extends BaseEntity {

    private String siteName;

    private String heroGreeting;

    private String heroTitle;

    @Column(columnDefinition = "TEXT")
    private String heroDescription;

    private String profileImageUrl;

    private String resumeUrl;

    private String githubUrl;

    private String linkedinUrl;

    private String email;

    private String phone;

    private String location;

    private String aboutEyebrow;

    private String aboutTitle;

    @Column(columnDefinition = "TEXT")
    private String aboutText;

    private String skillsTitle;

    private String projectsTitle;

    @Column(columnDefinition = "TEXT")
    private String projectsText;

    private String experienceTitle;

    private String blogTitle;

    private String servicesTitle;

    private String contactTitle;

    @Column(columnDefinition = "TEXT")
    private String contactText;


    // ==============================
    // CONSTRUCTOR
    // ==============================

    public SiteSettings() {
    }


    // ==============================
    // GETTERS & SETTERS
    // ==============================

    public String getSiteName() {
        return siteName;
    }

    public void setSiteName(String siteName) {
        this.siteName = siteName;
    }


    public String getHeroGreeting() {
        return heroGreeting;
    }

    public void setHeroGreeting(String heroGreeting) {
        this.heroGreeting = heroGreeting;
    }


    public String getHeroTitle() {
        return heroTitle;
    }

    public void setHeroTitle(String heroTitle) {
        this.heroTitle = heroTitle;
    }


    public String getHeroDescription() {
        return heroDescription;
    }

    public void setHeroDescription(String heroDescription) {
        this.heroDescription = heroDescription;
    }


    public String getProfileImageUrl() {
        return profileImageUrl;
    }

    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }


    public String getResumeUrl() {
        return resumeUrl;
    }

    public void setResumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
    }


    public String getGithubUrl() {
        return githubUrl;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }


    public String getLinkedinUrl() {
        return linkedinUrl;
    }

    public void setLinkedinUrl(String linkedinUrl) {
        this.linkedinUrl = linkedinUrl;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }


    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }


    public String getAboutEyebrow() {
        return aboutEyebrow;
    }

    public void setAboutEyebrow(String aboutEyebrow) {
        this.aboutEyebrow = aboutEyebrow;
    }


    public String getAboutTitle() {
        return aboutTitle;
    }

    public void setAboutTitle(String aboutTitle) {
        this.aboutTitle = aboutTitle;
    }


    public String getAboutText() {
        return aboutText;
    }

    public void setAboutText(String aboutText) {
        this.aboutText = aboutText;
    }


    public String getSkillsTitle() {
        return skillsTitle;
    }

    public void setSkillsTitle(String skillsTitle) {
        this.skillsTitle = skillsTitle;
    }


    public String getProjectsTitle() {
        return projectsTitle;
    }

    public void setProjectsTitle(String projectsTitle) {
        this.projectsTitle = projectsTitle;
    }


    public String getProjectsText() {
        return projectsText;
    }

    public void setProjectsText(String projectsText) {
        this.projectsText = projectsText;
    }


    public String getExperienceTitle() {
        return experienceTitle;
    }

    public void setExperienceTitle(String experienceTitle) {
        this.experienceTitle = experienceTitle;
    }


    public String getBlogTitle() {
        return blogTitle;
    }

    public void setBlogTitle(String blogTitle) {
        this.blogTitle = blogTitle;
    }


    public String getServicesTitle() {
        return servicesTitle;
    }

    public void setServicesTitle(String servicesTitle) {
        this.servicesTitle = servicesTitle;
    }


    public String getContactTitle() {
        return contactTitle;
    }

    public void setContactTitle(String contactTitle) {
        this.contactTitle = contactTitle;
    }


    public String getContactText() {
        return contactText;
    }

    public void setContactText(String contactText) {
        this.contactText = contactText;
    }
}