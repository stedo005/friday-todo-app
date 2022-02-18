package com.example.demo.todoList;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class RepoTodos {

    private List<ToDo> toDos;

    public RepoTodos(List<ToDo> toDos) {
        this.toDos = toDos;
    }

    public List<ToDo> listAllToDos() {
        return toDos;
    }

}
