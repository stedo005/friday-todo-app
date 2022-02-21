package com.example.demo.todoList;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class TodoItem {

    private String id = UUID.randomUUID().toString();
    private String content = "";
    private boolean statusDone;

}
