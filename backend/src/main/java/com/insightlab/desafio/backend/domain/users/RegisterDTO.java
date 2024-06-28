package com.insightlab.desafio.backend.domain.users;

public record RegisterDTO(
        String userName,
        String email,
        String password,
        UserRole role) {
}
