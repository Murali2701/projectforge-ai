package com.projectforge.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projectforge.entity.Project;
import com.projectforge.entity.User;

public interface ProjectRepository
        extends JpaRepository<Project, Long> {

    List<Project> findByUser(User user);
    List<Project> findByUserOrderByCreatedAtDesc(User user);

    Optional<Project> findByIdAndUser(Long id,
                                      User user);
}