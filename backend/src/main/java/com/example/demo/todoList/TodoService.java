package com.example.demo.todoList;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoItem addItem(TodoItem todoItem) {
        return todoRepository.save(todoItem);
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

    public void changeStatus(String id) {
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

    public List<TodoItem> listAllDone() {
        return todoRepository.findAllByStatusDoneTrue();
    }

    public void deleteAllDone() {
        for (TodoItem todoItem : listAllDone()) {
            deleteItem(todoItem.getId());
        }
    }

}
