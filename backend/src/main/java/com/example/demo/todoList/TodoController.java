package com.example.demo.todoList;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todo-app")
@CrossOrigin
public class TodoController {

    private final TodoService todoService;

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

    @DeleteMapping("/deleteAllDone")
    public void deleteAllDone() {
        todoService.deleteAllDone();
    }

    @PutMapping("/{idItem}")
    public void changeStatus(@PathVariable String idItem) {
        todoService.changeStatus(idItem);
    }

    @PutMapping
    public void changeOneItem(@RequestBody TodoItem changedItem) {
        todoService.changeOneItem(changedItem);
    }

    @GetMapping("/listAllItem")
    public List<TodoItem> listAllItem() {
        return todoService.listAllItem();
    }

    @GetMapping("/listAllDoneItem")
    public List<TodoItem> listAllDone() {
        return todoService.listAllDoneItem();
    }

    @GetMapping("{idItem}")
    public TodoItem listOneItem(@PathVariable String idItem) {
        return todoService.listOneItem(idItem);
    }

}