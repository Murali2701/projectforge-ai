package com.projectforge.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projectforge.dto.ProjectDto;
import com.projectforge.dto.UpdateProjectRequest;
import com.projectforge.service.ProjectService;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PutMapping("/{id}")
    public ProjectDto updateProject(
            Authentication authentication,
            @PathVariable Long id,
            @RequestBody UpdateProjectRequest request) {

        return projectService.updateProject(
                authentication,
                id,
                request
        );
    }

}