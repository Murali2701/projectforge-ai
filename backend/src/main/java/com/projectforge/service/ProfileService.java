package com.projectforge.service;

import com.projectforge.dto.UpdateProfileRequest;
import com.projectforge.dto.ProfileResponse;
import com.projectforge.entity.User;
import com.projectforge.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import com.projectforge.exception.UserNotFoundException;

@Service
public class ProfileService {

    private final UserRepository repository;

    public ProfileService(UserRepository repository) {
        this.repository = repository;
    }

    public ProfileResponse getProfile(Authentication authentication) {

        String email = authentication.getName();

        User user = repository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        return new ProfileResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }

    public ProfileResponse updateProfile(
        Authentication authentication,
        UpdateProfileRequest request) {

    String email = authentication.getName();

    User user = repository.findByEmail(email)
            .orElseThrow(() -> new UserNotFoundException("User not found"));

    user.setName(request.name());

    repository.save(user);

    return new ProfileResponse(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getRole()
    );
}
}