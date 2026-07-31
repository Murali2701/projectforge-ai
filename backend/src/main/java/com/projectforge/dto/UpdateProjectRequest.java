package com.projectforge.dto;

public record UpdateProjectRequest(
        String title,
        String description,
        String techStack
) {
}