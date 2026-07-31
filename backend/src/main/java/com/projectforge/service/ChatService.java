package com.projectforge.service;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.projectforge.dto.ChatRequest;
import com.projectforge.dto.ChatResponse;
import com.projectforge.entity.Chat;
import com.projectforge.entity.Message;
import com.projectforge.entity.User;
import com.projectforge.repository.ChatRepository;
import com.projectforge.repository.MessageRepository;
import com.projectforge.repository.UserRepository;

@Service
public class ChatService {

    private final GeminiService geminiService;
    private final UserRepository userRepository;
    private final ChatRepository chatRepository;
    private final MessageRepository messageRepository;

    public ChatService(
            GeminiService geminiService,
            UserRepository userRepository,
            ChatRepository chatRepository,
            MessageRepository messageRepository) {

        this.geminiService = geminiService;
        this.userRepository = userRepository;
        this.chatRepository = chatRepository;
        this.messageRepository = messageRepository;
    }

    public ChatResponse chat(Authentication authentication,
                             ChatRequest request) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Chat chat = new Chat();
        chat.setTitle(request.message());
        chat.setUser(user);

        chatRepository.save(chat);

        Message userMessage = new Message();
        userMessage.setChat(chat);
        userMessage.setSender("USER");
        userMessage.setContent(request.message());

        messageRepository.save(userMessage);

        String aiReply = geminiService.chat(request.message());

        Message aiMessage = new Message();
        aiMessage.setChat(chat);
        aiMessage.setSender("AI");
        aiMessage.setContent(aiReply);

        messageRepository.save(aiMessage);

        return new ChatResponse(aiReply);
    }
}