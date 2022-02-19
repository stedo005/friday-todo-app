package com.example.demo.todoList;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RepoTodos {

    private List<TodoItem> todoItems;

    public RepoTodos(List<TodoItem> todoItems) {
        this.todoItems = todoItems;
    }

    public void addItem(TodoItem todoItem) {
        todoItems.add(todoItem);
    }

    public void deleteItem(String idItem) {
        TodoItem todoItemToDelete = todoItems.stream()
                .filter(item -> item.getId().matches(idItem))
                .findFirst().orElse(null);
        todoItems.remove(todoItemToDelete);
    }

    public List<TodoItem> listAllItem() {
        return todoItems;
    }

    public TodoItem listOneItem(String id) {
        return todoItems.stream()
                .filter(t -> t.getId().matches(id))
                .findFirst().orElse(null);
    }

    public void setStatusDone(String id) {
        todoItems.stream()
                .filter(item -> item.getId().matches(id))
                .findFirst().orElse(null)
                .setStatusDone(true);
    }

}
