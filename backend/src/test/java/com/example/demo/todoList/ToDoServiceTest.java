package com.example.demo.todoList;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ToDoServiceTest {

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

        List<ToDo> repo = new ArrayList<>();
        repo.add(point1);
        repo.add(point2);
        repo.add(point3);

        RepoTodos repoTodos = new RepoTodos(repo);
        ToDoService service = new ToDoService(repoTodos);

        List<ToDo> actual = service.listAllToDos();

        assertEquals(repo, actual);

    }

}