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

        ToDo point1 = new ToDo("Punkt 1");
        ToDo point2 = new ToDo("Punkt 2");
        ToDo point3 = new ToDo("Punkt 3");

        List<ToDo> repo = new ArrayList<>();
        repo.add(point1);
        repo.add(point2);
        repo.add(point3);

        RepoTodos repoTodos = new RepoTodos(repo);
        ToDoService service = new ToDoService(repoTodos);

        List<ToDo> actual = service.listAllToDos();

        assertEquals(repo, actual);

    }

    @Test
    @DisplayName("should return searched todoItem")
    void test1() {

        ToDo point1 = new ToDo("Punkt 1");
        ToDo point2 = new ToDo("Punkt 2");
        ToDo point3 = new ToDo("Punkt 3");

        List<ToDo> repo = new ArrayList<>();

        RepoTodos repoTodos = new RepoTodos(repo);
        ToDoService service = new ToDoService(repoTodos);

        String idToSearch = point1.getId();
        System.out.println(idToSearch);

        service.add(point1);
        service.add(point2);
        service.add(point3);

        ToDo actual = service.listOneToDo(point1.getId());

        assertEquals(point1, actual);

    }

}