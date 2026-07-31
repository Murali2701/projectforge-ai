package com.projectforge.dto;

import java.util.List;

public record ChatDetailResponse(
        Long id,
        String title,
        List<MessageResponse> messages
) {}