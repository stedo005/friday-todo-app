package com.example.demo.todoList;

import lombok.RequiredArgsConstructor;
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

/*    public void deleteAllDone() {
        List<TodoItem> doneItem = repoTodos.listAllItem().stream()
                .filter(e -> e.isStatusDone())
                .toList();
        for (TodoItem todoItem : doneItem) {
            repoTodos.deleteItem(todoItem.getId());
        }
    }*/

    public List<TodoItem> listAllItem() {
        return todoRepository.findAll();
    }

/*    public List<TodoItem> listAllDoneItem() {
        return repoTodos.listAllItem().stream()
                .filter(e -> e.isStatusDone())
                .toList();
    }*/

    public Optional<TodoItem> listOneItem(String id) {
        return todoRepository.findById(id);
    }

/*    public void changeOneItem(TodoItem changedItem) {
        listOneItem(changedItem.getId()).setTitle(changedItem.getTitle());
        listOneItem(changedItem.getId()).setTask(changedItem.getTask());
    }*/

/*    public void changeStatus(String id){
        if(listOneItem(id).isStatusDone() == false) {
            listOneItem(id).setStatusDone(true);
        } else {
            listOneItem(id).setStatusDone(false);
        }
    }*/

}
