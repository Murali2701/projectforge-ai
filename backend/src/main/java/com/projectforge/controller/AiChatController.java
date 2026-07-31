package com.projectforge.controller;

import com.projectforge.dto.ChatRequest;
import com.projectforge.dto.ChatResponse;
import com.projectforge.service.ChatService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173")
public class AiChatController {

    private final ChatService chatService;

    public AiChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public ChatResponse chat(
            Authentication authentication,
            @Valid @RequestBody ChatRequest request) {

        return chatService.chat(authentication, request);
    }
}