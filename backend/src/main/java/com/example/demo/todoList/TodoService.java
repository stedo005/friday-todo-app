package com.example.demo.todoList;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    private RepoTodos repoTodos;

    public TodoService(RepoTodos repoTodos) {
        this.repoTodos = repoTodos;
    }

    public void addItem(TodoItem todoItem) {
        repoTodos.addItem(todoItem);
    }

    public void deleteItem(String idItem) {
        repoTodos.deleteItem(idItem);
    }

    public List<TodoItem> listAllItem() {
        return repoTodos.listAllItem();
    }

    public TodoItem listOneItem(String id) {
        return repoTodos.listOneItem(id);
    }

    public void setStatusDone(String id) {
        repoTodos.setStatusDone(id);
    }

}
