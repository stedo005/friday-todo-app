package com.example.demo.todoList;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    public void addItem(TodoItem todoItem) {
        todoRepository.save(todoItem);
    }

    public void deleteItem(String idItem) {
        todoRepository.deleteById(idItem);
    }

    public List<TodoItem> listAllItem() {
        return todoRepository.findAll();
    }

    public Optional<TodoItem> listOneItem(String id) {
        return todoRepository.findById(id);
    }

    public void patchTodo(String id) {
        Optional<TodoItem> optionalOfTodoItem = todoRepository.findById(id);
        if(optionalOfTodoItem.isPresent()){
            TodoItem currentTodo = optionalOfTodoItem.get();
            if(currentTodo.isStatusDone()){
                currentTodo.setStatusDone(false);
            } else {
                currentTodo.setStatusDone(true);
            }
            todoRepository.save(currentTodo);
        }
    }

    public void changeContent(String id, TodoItem todoItem) {
        Optional<TodoItem> optionalOfTodoItem = todoRepository.findById(id);
        if(optionalOfTodoItem.isPresent()) {
            TodoItem todoFromDB = optionalOfTodoItem.get();
            todoFromDB.setId(id);
            todoFromDB.setStatusDone(todoItem.isStatusDone());
            todoFromDB.setTitle(todoItem.getTitle());
            todoFromDB.setTask(todoItem.getTask());
            todoRepository.save(todoFromDB);
        }
    }

/*    public void deleteAllDone() {
        List<TodoItem> doneItem = repoTodos.listAllItem().stream()
                .filter(e -> e.isStatusDone())
                .toList();
        for (TodoItem todoItem : doneItem) {
            repoTodos.deleteItem(todoItem.getId());
        }
    }*/

/*    public List<TodoItem> listAllDoneItem() {
        return repoTodos.listAllItem().stream()
                .filter(e -> e.isStatusDone())
                .toList();
    }*/

}
