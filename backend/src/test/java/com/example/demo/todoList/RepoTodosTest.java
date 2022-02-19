package com.example.demo.todoList;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

class RepoTodosTest {

    @Test
    @DisplayName("should be return Objects")
    void test() {

        TodoItem point1 = new TodoItem();
        TodoItem point2 = new TodoItem();
        TodoItem point3 = new TodoItem();

        point1.setContent("Punkt1");
        point2.setContent("Punkt2");
        point3.setContent("Punkt3");

        point1.setStatus(false);
        point2.setStatus(false);
        point3.setStatus(false);

        List<TodoItem> todoItemListList = new ArrayList<>();
        todoItemListList.add(point1);
        todoItemListList.add(point2);
        todoItemListList.add(point3);


    }

}