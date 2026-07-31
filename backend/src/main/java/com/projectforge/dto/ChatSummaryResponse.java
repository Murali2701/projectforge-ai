package com.projectforge.dto;

import java.time.LocalDateTime;

public record ChatSummaryResponse(
        Long id,
        String title,
        LocalDateTime createdAt
) {}