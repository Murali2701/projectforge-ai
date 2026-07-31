package com.projectforge.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.projectforge.dto.CreateProjectRequest;
import com.projectforge.dto.ProjectDto;
import com.projectforge.dto.UpdateProjectRequest;
import com.projectforge.entity.Project;
import com.projectforge.entity.User;
import com.projectforge.exception.ProjectNotFoundException;
import com.projectforge.exception.UserNotFoundException;
import com.projectforge.repository.ProjectRepository;
import com.projectforge.repository.UserRepository;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository,
                          UserRepository userRepository) {

        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public ProjectDto createProject(Authentication authentication,
                                CreateProjectRequest request) {

    System.out.println("===== CREATE PROJECT =====");
    System.out.println(authentication);

    User user = userRepository.findByEmail(authentication.getName())
            .orElseThrow(() -> new RuntimeException("User not found"));

    System.out.println("User = " + user.getEmail());

    Project project = new Project();

    project.setTitle(request.title());
    project.setDescription(request.description());
    project.setTechStack(request.techStack());
    project.setCreatedAt(LocalDateTime.now());
    project.setUser(user);

    Project saved = projectRepository.save(project);

    System.out.println("Saved Project ID = " + saved.getId());

    return new ProjectDto(
            saved.getId(),
            saved.getTitle(),
            saved.getDescription(),
            saved.getTechStack(),
            saved.getCreatedAt()
    );
}

    public List<ProjectDto> getProjects(Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return projectRepository.findByUser(user)
                .stream()
                .map(project -> new ProjectDto(
                        project.getId(),
                        project.getTitle(),
                        project.getDescription(),
                        project.getTechStack(),
                        project.getCreatedAt()
                ))
                .toList();
    }

    public ProjectDto getProject(Authentication authentication,
                                 Long id) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Project project = projectRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        return new ProjectDto(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getTechStack(),
                project.getCreatedAt()
        );
    }

    public void deleteProject(Authentication authentication,
                              Long id) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        Project project = projectRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ProjectNotFoundException("Project not found"));

        projectRepository.delete(project);
    }
    public ProjectDto updateProject(
        Authentication authentication,
        Long id,
        UpdateProjectRequest request) {

    User user = userRepository.findByEmail(authentication.getName())
            .orElseThrow(() -> new RuntimeException("User not found"));

    Project project = projectRepository.findByIdAndUser(id, user)
            .orElseThrow(() -> new RuntimeException("Project not found"));

    project.setTitle(request.title());
    project.setDescription(request.description());
    project.setTechStack(request.techStack());

    Project updated = projectRepository.save(project);

    return new ProjectDto(
            updated.getId(),
            updated.getTitle(),
            updated.getDescription(),
            updated.getTechStack(),
            updated.getCreatedAt()
    );
}
}