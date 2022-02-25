package com.example.demo.todoList;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todo-app")
@CrossOrigin
public class TodoController {

    private TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping
    public void addItem(@RequestBody TodoItem todoItem) {
        todoService.addItem(todoItem);
    }

    @DeleteMapping ("/{idItem}")
    public void deleteItem(@PathVariable String idItem) {
        todoService.deleteItem(idItem);
    }

    @PutMapping("/{idItem}")
    public void setStatusDone(@PathVariable String idItem) {
        todoService.setStatusDone(idItem);
    }

    @GetMapping("/listAllItem")
    public List<TodoItem> listAllItem() {
        return todoService.listAllItem();
    }

    @GetMapping("{idItem}")
    public TodoItem listOneItem(@PathVariable String idItem) {
        return todoService.listOneItem(idItem);
    }

}