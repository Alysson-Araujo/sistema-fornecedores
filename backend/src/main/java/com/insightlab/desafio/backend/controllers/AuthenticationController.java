package com.insightlab.desafio.backend.controllers;

import com.insightlab.desafio.backend.domain.users.LoginDTO;
import com.insightlab.desafio.backend.domain.users.LoginResponseDTO;
import com.insightlab.desafio.backend.domain.users.RegisterDTO;
import com.insightlab.desafio.backend.domain.users.User;
import com.insightlab.desafio.backend.infra.security.TokenService;
import com.insightlab.desafio.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    TokenService tokenService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid LoginDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return new ResponseEntity<>(new LoginResponseDTO(token,data.email()), HttpStatus.OK);
    }


    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody @Valid RegisterDTO registerDTO){
        System.out.println(registerDTO.email());
        System.out.println((this.userRepository.findByEmail(registerDTO.email())));
        if(this.userRepository.findByEmail(registerDTO.email()) != null){
            return ResponseEntity.badRequest().build();
        }
        else {
            String encryptedPassword = new BCryptPasswordEncoder().encode(registerDTO.password());
            User newUser = new User(registerDTO.userName(), registerDTO.email(), encryptedPassword, registerDTO.role());
            this.userRepository.save(newUser);
            return ResponseEntity.ok().build();
        }
    }
}
