package com.example.demo.todoList.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public String createUser(UserDetails user) {
        if(userRepository.existsByEmail(user.getEmail())){
            return "Diese eMail-Adresse existiert schon";
        }
        userRepository.save(user);
        return user.getUsername();
    }

    public Optional<UserDetails> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

}
