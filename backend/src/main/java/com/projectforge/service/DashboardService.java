package com.projectforge.service;

import com.projectforge.dto.DashboardDto;
import com.projectforge.dto.ProjectDto;
import com.projectforge.entity.Project;
import com.projectforge.entity.User;
import com.projectforge.repository.ProjectRepository;
import com.projectforge.repository.UserRepository;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public DashboardService(ProjectRepository projectRepository,
                            UserRepository userRepository) {

        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public DashboardDto getDashboard(Authentication authentication) {

        User user = userRepository
                .findByEmail(authentication.getName())
                .orElseThrow();

        List<Project> projects =
                projectRepository.findByUserOrderByCreatedAtDesc(user);

        long totalProjects = projects.size();

        long totalBlueprints = totalProjects;

        Set<String> techStacks = projects.stream()

                .flatMap(project ->
                        List.of(project.getTechStack().split(","))
                                .stream())

                .map(s -> s.trim())

                .collect(Collectors.toSet());

        List<ProjectDto> recentProjects =

                projects.stream()

                        .limit(5)

                        .map(project -> new ProjectDto(
        project.getId(),
        project.getTitle(),
        project.getDescription(),
        project.getTechStack(),
        project.getCreatedAt()
))

                        .toList();

        return new DashboardDto(

                totalProjects,

                totalBlueprints,

                techStacks.size(),

                recentProjects
        );
    }
}