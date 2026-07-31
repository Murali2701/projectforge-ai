package com.projectforge.dto;

public record ProfileResponse(
        Long id,
        String name,
        String email,
        String role
) {
}