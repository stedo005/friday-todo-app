package com.example.demo.todoList.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping
    public UserDetails createUser(@RequestBody UserDetails user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userService.createUser(user);
    }

    @GetMapping("/{eMail}")
    public String getUser(@PathVariable String eMail) {
        if (userService.findByEmail(eMail).isPresent()) {
            return userService.findByEmail(eMail).get().getUsername();
        } else {
            throw new RuntimeException("Diesen User gibt es nicht!");
        }
    }

}
