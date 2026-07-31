package com.projectforge.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.projectforge.dto.ChatSummaryResponse;
import com.projectforge.entity.User;
import com.projectforge.repository.ChatRepository;
import com.projectforge.repository.UserRepository;

@Service
public class ChatHistoryService {

    private final ChatRepository chatRepository;
    private final UserRepository userRepository;

    public ChatHistoryService(ChatRepository chatRepository,
                              UserRepository userRepository) {
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
    }

    public List<ChatSummaryResponse> getChats(Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return chatRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(chat -> new ChatSummaryResponse(
                        chat.getId(),
                        chat.getTitle(),
                        chat.getCreatedAt()
                ))
                .toList();
    }
}