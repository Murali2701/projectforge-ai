package com.projectforge.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateProjectRequest(

        @NotBlank(message = "Project title is required")
        String title,

        @NotBlank(message = "Description is required")
        String description,

        @NotBlank(message = "Tech Stack is required")
        String techStack

) {
}