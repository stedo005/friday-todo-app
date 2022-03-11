package com.example.demo.todoList;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/todo-app")
@CrossOrigin
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @PostMapping
    public void addItem(@RequestBody TodoItem todoItem) {
        todoService.addItem(todoItem);
    }

    @DeleteMapping ("/{idItem}")
    public void deleteItem(@PathVariable String idItem) {
        todoService.deleteItem(idItem);
    }

    @GetMapping("/listAllItem")
    public List<TodoItem> listAllItem() {
        return todoService.listAllItem();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TodoItem> listOneItem(@PathVariable String id) {
        return ResponseEntity.of(todoService.listOneItem(id));
    }

    @PatchMapping("/{id}")
    public void patchTodo(@PathVariable String id, TodoItem todoItem) {
        todoService.patchTodo(id, todoItem);
    }

/*    @DeleteMapping("/deleteAllDone")
    public void deleteAllDone() {
        todoService.deleteAllDone();
    }*/

/*    @PutMapping("/{idItem}")
    public void changeStatus(@PathVariable String idItem) {
        todoService.changeStatus(idItem);
    }*/

/*    @PutMapping
    public void changeOneItem(@RequestBody TodoItem changedItem) {
        todoService.changeOneItem(changedItem);
    }*/


 /*   @GetMapping("/listAllDoneItem")
    public List<TodoItem> listAllDone() {
        return todoService.listAllDoneItem();
    }*/

}