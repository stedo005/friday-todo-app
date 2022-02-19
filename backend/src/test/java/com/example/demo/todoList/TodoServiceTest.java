package com.example.demo.todoList;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class TodoServiceTest {

    @Test
    @DisplayName("should return Objects in repo")
    void test() {

        TodoItem point1 = new TodoItem("Punkt 1");
        TodoItem point2 = new TodoItem("Punkt 2");
        TodoItem point3 = new TodoItem("Punkt 3");

        List<TodoItem> repo = new ArrayList<>();
        repo.add(point1);
        repo.add(point2);
        repo.add(point3);

        RepoTodos repoTodos = new RepoTodos(repo);
        TodoService service = new TodoService(repoTodos);

        List<TodoItem> actual = service.listAllItem();

        assertEquals(repo, actual);

    }

    @Test
    @DisplayName("should return searched todoItem")
    void test1() {

        TodoItem point1 = new TodoItem("Punkt 1");
        TodoItem point2 = new TodoItem("Punkt 2");
        TodoItem point3 = new TodoItem("Punkt 3");

        List<TodoItem> repo = new ArrayList<>();

        RepoTodos repoTodos = new RepoTodos(repo);
        TodoService service = new TodoService(repoTodos);

        service.addItem(point1);
        service.addItem(point2);
        service.addItem(point3);

        TodoItem actual = service.listOneItem(point1.getId());

        assertEquals(point1, actual);

    }

    @Test
    @DisplayName("should set statusDone true")
    void test2() {

        TodoItem point1 = new TodoItem("Punkt 1");
        TodoItem point2 = new TodoItem("Punkt 2");
        TodoItem point3 = new TodoItem("Punkt 3");

        List<TodoItem> repo = new ArrayList<>();

        RepoTodos repoTodos = new RepoTodos(repo);
        TodoService service = new TodoService(repoTodos);

        service.addItem(point1);
        service.addItem(point2);
        service.addItem(point3);

        service.setStatusDone(point1.getId());
        boolean actual = point1.isStatusDone();
        assertTrue(actual);

    }

    @Test
    @DisplayName("should delete 1 todoItem")
    void test3() {

        TodoItem point1 = new TodoItem("Punkt 1");
        TodoItem point2 = new TodoItem("Punkt 2");
        TodoItem point3 = new TodoItem("Punkt 3");
        List<TodoItem> repo = new ArrayList<>();
        RepoTodos repoTodos = new RepoTodos(repo);
        TodoService service = new TodoService(repoTodos);
        service.addItem(point1);
        service.addItem(point2);
        service.addItem(point3);

        service.deleteItem(point2.getId());

        String actual = repo.toString();

        assertEquals("[Punkt 1, Punkt 3]", actual);

    }

    @Test
    @DisplayName("Mockito delete 1 item")
    void test4() {

        TodoItem point1 = new TodoItem("Punkt 1");
        TodoItem point2 = new TodoItem("Punkt 2");
        TodoItem point3 = new TodoItem("Punkt 3");

        RepoTodos mockedRepo = Mockito.mock(RepoTodos.class);

        mockedRepo.deleteItem(point2.getId());

        Mockito.verify(mockedRepo).deleteItem(point2.getId());

    }

    @Test
    @DisplayName("Mockito get 1 Item")
    void test5() {

        RepoTodos mockedRepo = Mockito.mock(RepoTodos.class);
        Mockito.when(mockedRepo.listOneItem("1234"))
                .thenReturn(new TodoItem());

        TodoService service = new TodoService(mockedRepo);
        TodoItem actual = service.listOneItem("1234");
        assertNotNull(actual);

    }

}