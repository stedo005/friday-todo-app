package com.example.demo.todoList;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/todo-app")
@CrossOrigin
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @PostMapping
    public TodoItem addItem(@RequestBody TodoItem todoItem) {
        return todoService.addItem(todoItem);
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
    public void changeStatus(@PathVariable String id) {
        todoService.changeStatus(id);
    }

    @PutMapping("/{id}")
    public void changeContent(@PathVariable String id, @RequestBody TodoItem todoItem) {
        todoService.changeContent(id, todoItem);
    }

    @GetMapping("/listAllDoneItem")
    public List<TodoItem> listAllDone() {
        return todoService.listAllDone();
    }

    @DeleteMapping("/deleteAllDone")
    public void deleteAllDone() {
        todoService.deleteAllDone();
    }



}