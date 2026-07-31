package com.projectforge.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projectforge.dto.ChatSummaryResponse;
import com.projectforge.service.ChatHistoryService;

@RestController
@RequestMapping("/api/chat-history")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatHistoryController {

    private final ChatHistoryService chatHistoryService;

    public ChatHistoryController(ChatHistoryService chatHistoryService) {
        this.chatHistoryService = chatHistoryService;
    }

    @GetMapping
    public List<ChatSummaryResponse> getChats(Authentication authentication) {
        return chatHistoryService.getChats(authentication);
    }
}