package com.projectforge.dto;

import java.time.LocalDateTime;

public record MessageResponse(
        Long id,
        String sender,
        String content,
        LocalDateTime createdAt
) {}