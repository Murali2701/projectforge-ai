package com.projectforge.dto;

import java.time.LocalDateTime;

public record ProjectDto(

        Long id,
        String title,
        String description,
        String techStack,
        LocalDateTime createdAt

) {
}