package com.projectforge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projectforge.entity.Chat;
import com.projectforge.entity.User;

public interface ChatRepository extends JpaRepository<Chat, Long> {

    List<Chat> findByUserOrderByCreatedAtDesc(User user);

}