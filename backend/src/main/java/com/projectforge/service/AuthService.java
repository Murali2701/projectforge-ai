package com.projectforge.service;

import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.projectforge.dto.LoginRequest;
import com.projectforge.dto.LoginResponse;
import com.projectforge.dto.RegisterRequest;
import com.projectforge.entity.User;
import com.projectforge.exception.InvalidCredentialsException;
import com.projectforge.exception.UserNotFoundException;
import com.projectforge.repository.UserRepository;
import com.projectforge.security.JwtService;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.email())) {
            return "Email already exists";
        }

        User user = new User();

        user.setName(request.name());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole("USER");
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);

        return "User Registered Successfully";
    }

    public LoginResponse login(LoginRequest request) {

    System.out.println("========== LOGIN ==========");
    System.out.println("Email: " + request.email());

    User user = userRepository.findByEmail(request.email())
            .orElseThrow(() ->
                    new UserNotFoundException("User not found"));

    System.out.println("Stored Hash: " + user.getPassword());
    System.out.println("Entered Password: " + request.password());

    boolean match = passwordEncoder.matches(
            request.password(),
            user.getPassword()
    );

    System.out.println("Password Match = " + match);

    if (!match) {
        throw new InvalidCredentialsException("Invalid email or password");
    }

    String token = jwtService.generateToken(user.getEmail());

    System.out.println("Login Successful");

    return new LoginResponse(token);
}
}