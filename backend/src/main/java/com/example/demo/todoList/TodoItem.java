package com.example.demo.todoList;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "todos")
@Data
@NoArgsConstructor
public class TodoItem {

    @Id
    private String id;
    private String title ="";
    private String task = "";
    private boolean statusDone;
    private String userId;

}
