package com.projectforge.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projectforge.dto.CreateProjectRequest;
import com.projectforge.dto.ProjectDto;
import com.projectforge.service.ProjectService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/projects")
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