package com.insightlab.desafio.backend.repositories;

import com.insightlab.desafio.backend.domain.users.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    User findByEmail(String email);

}
