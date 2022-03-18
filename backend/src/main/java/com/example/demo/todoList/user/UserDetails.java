package com.example.demo.todoList.user;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Data
public class UserDetails {

    @Id
    private String id;
    private String username = "user";
    private String password;
    private String email;
    private String role = "USER";

}
