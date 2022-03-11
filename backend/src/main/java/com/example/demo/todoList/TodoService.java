package com.example.demo.todoList;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public void patchTodo(String id, TodoItem todoItem) {
        Optional<TodoItem> optionalOfTodoItem = todoRepository.findById(id);
        if(optionalOfTodoItem.isPresent()){
            TodoItem currentTodo = optionalOfTodoItem.get();
            if(todoItem.isStatusDone()){
                currentTodo.setStatusDone(false);
            } else {
                currentTodo.setStatusDone(true);
            }
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


/*    public void changeOneItem(TodoItem changedItem) {


        listOneItem(changedItem.getId()).setTitle(changedItem.getTitle());
        listOneItem(changedItem.getId()).setTask(changedItem.getTask());
    }*/


 /*   public void changeStatus(String id){



    }*/

}
