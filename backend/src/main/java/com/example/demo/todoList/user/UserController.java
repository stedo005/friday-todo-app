package com.example.demo.todoList.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    //private final PasswordEncoder passwordEncoder;

    @PostMapping
    public UserDetails createUser(@RequestBody UserDetails user) {
        return userService.createUser(user);
    }

}
