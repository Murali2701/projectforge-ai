package com.projectforge.controller;

import jakarta.validation.Valid;
import com.projectforge.dto.CreateProjectRequest;
import com.projectforge.dto.ProjectDto;
import com.projectforge.service.ProjectService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:5173")
public class ProjectCrudController {

    private final ProjectService projectService;

    public ProjectCrudController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public ProjectDto createProject(
            Authentication authentication,
            @Valid @RequestBody CreateProjectRequest request) {

        return projectService.createProject(authentication, request);
    }

    @GetMapping
    public List<ProjectDto> getProjects(
            Authentication authentication) {

        return projectService.getProjects(authentication);
    }

    @GetMapping("/{id}")
    public ProjectDto getProject(
            Authentication authentication,
            @PathVariable Long id) {

        return projectService.getProject(authentication, id);
    }

    @DeleteMapping("/{id}")
    public String deleteProject(
            Authentication authentication,
            @PathVariable Long id) {

        projectService.deleteProject(authentication, id);

        return "Project deleted successfully";
    }
}