package com.example.demo.todoList;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    private final RepoTodos repoTodos;

    public TodoService(RepoTodos repoTodos) {
        this.repoTodos = repoTodos;
    }

    public void addItem(TodoItem todoItem) {
        repoTodos.addItem(todoItem);
    }

    public void deleteItem(String idItem) {
        repoTodos.deleteItem(idItem);
    }

    public void deleteAllDone() {
        List<TodoItem> doneItem = repoTodos.listAllItem().stream()
                .filter(e -> e.isStatusDone())
                .toList();
        for (TodoItem todoItem : doneItem) {
            repoTodos.deleteItem(todoItem.getId());
        }
    }

    public List<TodoItem> listAllItem() {
        return repoTodos.listAllItem();
    }

    public List<TodoItem> listAllDoneItem() {
        return repoTodos.listAllItem().stream()
                .filter(e -> e.isStatusDone())
                .toList();
    }

    public TodoItem listOneItem(String id) {
        return repoTodos.listOneItem(id);
    }

    public void changeOneItem(TodoItem changedItem) {
        listOneItem(changedItem.getId()).setTitle(changedItem.getTitle());
        listOneItem(changedItem.getId()).setTask(changedItem.getTask());
    }

    public void changeStatus(String id){
        if(listOneItem(id).isStatusDone() == false) {
            listOneItem(id).setStatusDone(true);
        } else {
            listOneItem(id).setStatusDone(false);
        }
    }

}
