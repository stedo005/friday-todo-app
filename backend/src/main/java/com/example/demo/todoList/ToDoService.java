package com.example.demo.todoList;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToDoService {

    private RepoTodos repoToDos;

    public ToDoService(RepoTodos repoToDos) {
        this.repoToDos = repoToDos;
    }

    public List<ToDo> listAllToDos() {
        return repoToDos.listAllToDos();
    }

}
