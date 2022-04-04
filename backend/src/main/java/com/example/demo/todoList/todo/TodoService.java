package com.example.demo.todoList.todo;

import com.example.demo.todoList.todo.TodoItem;
import com.example.demo.todoList.todo.TodoRepository;
import com.example.demo.todoList.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;
    private final UserRepository userRepository;

    public TodoItem addItem(TodoItem todoItem, Principal principal) {
        todoItem.setUserId(getUserId(principal));
        return todoRepository.save(todoItem);
    }

    public void deleteItem(String idItem, Principal principal) {
        todoRepository.deleteTodoItemByIdAndUserId(idItem, getUserId(principal));
    }

    public List<TodoItem> listAllItem(Principal principal) {
        return todoRepository.findAllByUserId(getUserId(principal));
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

    public List<TodoItem> listAllDone(Principal principal) {
        return todoRepository.findAllByStatusDoneTrueAndUserId(getUserId(principal));
    }

    public void deleteAllDone(Principal principal) {
        todoRepository.deleteAllByStatusDoneTrueAndUserId(getUserId(principal));
    }

    private String getUserId(Principal principal) {
        return userRepository.findByEmail(principal.getName()).get().getId();
    }

}
