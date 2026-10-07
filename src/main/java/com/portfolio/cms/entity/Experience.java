package com.portfolio.cms.entity;

import jakarta.persistence.*; 
import lombok.*;

@Entity
@Getter 
@Setter 
@NoArgsConstructor
public class Experience extends BaseEntity { 
	private String title; @Column(length=10000) 
	private String description; private String imageUrl; 
	private String link; private Integer sortOrder=0; 
	private Boolean published=true; }
