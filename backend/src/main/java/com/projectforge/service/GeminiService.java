package com.projectforge.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final WebClient webClient;

    public GeminiService() {
        this.webClient = WebClient.builder()
                .baseUrl("https://generativelanguage.googleapis.com")
                .build();
    }

    public String generateRequirements(String idea) {

        String prompt = """
                Generate a complete software project blueprint for:

                %s

                Format the response in Markdown.

                Include:
                # Project Overview
                # Functional Requirements
                # Non-Functional Requirements
                # Database Tables
                # REST API Endpoints
                # Recommended Tech Stack
                # Development Roadmap
                """.formatted(idea);

        return callGemini(prompt);
    }

    public String generateSchema(String idea) {

        String prompt = """
                Generate ONLY the MySQL database schema for:

                %s

                Requirements:
                - Use CREATE TABLE statements
                - Include PRIMARY KEY
                - Include FOREIGN KEY relationships
                - Do NOT include explanations
                - Return only SQL code
                """.formatted(idea);

        return callGemini(prompt);
    }

    public String generateApis(String idea) {

    String prompt = """
            Generate REST API endpoints for the following project.

            Project:
            %s

            Include:
            - HTTP Method
            - Endpoint URL
            - Purpose
            - Sample Request Body (where applicable)

            Format the response in Markdown.
            """.formatted(idea);

    return callGemini(prompt);
}

public String chat(String message) {

    String prompt = """
        You are ProjectForge AI, an expert software architect and senior full-stack developer.

        Always:
        - Answer in Markdown.
        - Use headings where appropriate.
        - Use bullet points when useful.
        - Include Java, Spring Boot, React, SQL, or JavaScript code examples when relevant.
        - Explain concepts clearly.
        - Give best practices.
        - If asked to debug code, explain the issue and provide the corrected code.

        User Question:
        %s
        """.formatted(message);

    return callGemini(prompt);
}

    private String callGemini(String prompt) {

        try {

            Map<String, Object> requestBody = Map.of(
                    "contents", List.of(
                            Map.of(
                                    "parts", List.of(
                                            Map.of("text", prompt)
                                    )
                            )
                    )
            );

            Map<?, ?> response = webClient.post()
                    .uri("/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response == null || !response.containsKey("candidates")) {
                return "No response received from Gemini.";
            }

            List<?> candidates = (List<?>) response.get("candidates");

            if (candidates.isEmpty()) {
                return "No content generated.";
            }

            Map<?, ?> candidate = (Map<?, ?>) candidates.get(0);
            Map<?, ?> content = (Map<?, ?>) candidate.get("content");
            List<?> parts = (List<?>) content.get("parts");
            Map<?, ?> firstPart = (Map<?, ?>) parts.get(0);

            return firstPart.get("text").toString();

        } catch (Exception e) {
            return "Gemini Error: " + e.getMessage();
        }
    }
}