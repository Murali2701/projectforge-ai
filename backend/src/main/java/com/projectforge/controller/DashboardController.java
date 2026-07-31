package com.projectforge.controller;

import com.projectforge.dto.DashboardDto;
import com.projectforge.service.DashboardService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public DashboardDto getDashboard(
            Authentication authentication) {

        return dashboardService.getDashboard(authentication);
    }
}