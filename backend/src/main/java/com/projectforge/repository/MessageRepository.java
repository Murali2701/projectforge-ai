package com.projectforge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projectforge.entity.Chat;
import com.projectforge.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findByChatOrderByCreatedAtAsc(Chat chat);

}