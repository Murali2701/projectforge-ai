package com.projectforge.dto;

import java.util.List;

public record DashboardDto(

        long totalProjects,

        long totalBlueprints,

        long uniqueTechStacks,

        List<ProjectDto> recentProjects

) {}