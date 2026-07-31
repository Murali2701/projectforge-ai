package com.projectforge.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projectforge.dto.CreateProjectRequest;
import com.projectforge.dto.ProjectRequest;
import com.projectforge.dto.ProjectResponse;
import com.projectforge.service.GeminiService;
import com.projectforge.service.ProjectService;

@RestController
@RequestMapping("/api/project")
@CrossOrigin(origins = "http://localhost:5173")
public class AiProjectController {

    private static final Logger log = LoggerFactory.getLogger(AiProjectController.class);

    private final GeminiService geminiService;
    private final ProjectService projectService;

  


    public AiProjectController(
        GeminiService geminiService,
        ProjectService projectService) {

    this.geminiService = geminiService;
    this.projectService = projectService;
}

    @GetMapping("/test")
    public String test() {
        return "Project Controller Working";
    }

    
    @PostMapping("/generate")
public ProjectResponse generate(
        Authentication authentication,
        @RequestBody ProjectRequest request) {
        log.info("===== GENERATE API =====");
        log.info("Authentication = {}", authentication);
        String blueprint =
                geminiService.generateRequirements(request.idea());

        projectService.createProject(
                authentication,
                new CreateProjectRequest(
                        request.idea(),
                        blueprint,
                        "Spring Boot, React, MySQL"
                )
        );

    return new ProjectResponse(blueprint);
}
     
    @PostMapping("/generate-schema")
    public ProjectResponse generateSchema(@RequestBody ProjectRequest request) {

        String result = geminiService.generateSchema(request.idea());

        return new ProjectResponse(result);
    }

    @PostMapping("/generate-apis")
public ProjectResponse generateApis(@RequestBody ProjectRequest request) {

    String result = geminiService.generateApis(request.idea());

    return new ProjectResponse(result);
}
}