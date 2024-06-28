package com.insightlab.desafio.backend.infra.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.insightlab.desafio.backend.domain.users.User;
import com.insightlab.desafio.backend.exceptions.FailJWTCreationException;
import com.insightlab.desafio.backend.exceptions.InvalidJWTException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${api.token.secret}")
    private String jwtSecret;

    public String generateToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(jwtSecret);
            String token = JWT.create().
                    withIssuer("Desafio Insightlab").
                    withSubject(user.getEmail()).
                    withExpiresAt(getExpirationDate()).
                    sign(algorithm);
            return token;
        } catch (JWTCreationException e) {
            throw new FailJWTCreationException("Falha ao criar JWT", e.getCause());
        }
    }

    public String validateToken(String token) {
        try {
            return JWT.require(Algorithm.HMAC256(jwtSecret))
                    .withIssuer("Desafio Insightlab")
                    .build()
                    .verify(token)
                    .getSubject();
        }
        catch (JWTVerificationException e){
            throw new InvalidJWTException("Token inválido", e.getCause());
        }
    }

    private Instant getExpirationDate() {
        return LocalDateTime.now().plusDays(7).toInstant(ZoneOffset.of("-03:00"));
    }
}
