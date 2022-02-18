package com.example.demo.todoList;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class RepoTodosTest {

    @Test
    @DisplayName("should be return Objects")
    void test() {

        ToDo point1 = new ToDo();
        ToDo point2 = new ToDo();
        ToDo point3 = new ToDo();

        point1.setContent("Punkt1");
        point2.setContent("Punkt2");
        point3.setContent("Punkt3");

        point1.setStatus(false);
        point2.setStatus(false);
        point3.setStatus(false);

        List<ToDo> toDoListList = new ArrayList<>();
        toDoListList.add(point1);
        toDoListList.add(point2);
        toDoListList.add(point3);


    }

}