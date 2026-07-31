package com.projectforge.controller;

import jakarta.validation.Valid;
import com.projectforge.dto.ProfileResponse;
import com.projectforge.service.ProfileService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import com.projectforge.dto.UpdateProfileRequest;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ProfileResponse profile(Authentication authentication) {

        return profileService.getProfile(authentication);
    }

    @PutMapping
public ProfileResponse updateProfile(
        Authentication authentication,
        @Valid @RequestBody UpdateProfileRequest request) {

    return profileService.updateProfile(authentication, request);
}
}