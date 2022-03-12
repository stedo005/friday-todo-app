package com.example.demo.todoList;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

class TodoServiceTest {

    @Test
    @DisplayName("should add new Item")
    void test() {

        TodoItem itemToSave = new TodoItem();
        itemToSave.setTitle("hallo");
        itemToSave.setStatusDone(true);

        TodoItem itemSaved = new TodoItem();
        itemSaved.setId("1");
        itemSaved.setTitle("hallo");
        itemSaved.setStatusDone(false);

        TodoRepository mockRepo = Mockito.mock(TodoRepository.class);
        Mockito.when(mockRepo.save(itemToSave)).thenReturn(itemSaved);

        TodoService service = new TodoService(mockRepo);
        TodoItem actual = service.addItem(itemToSave);

        Assertions.assertThat(actual).isSameAs(itemSaved);

    }

    @Test
    @DisplayName("Mockito delete 1 item")
    void test4() {

        TodoItem point1 = new TodoItem();
        TodoItem point2 = new TodoItem();
        TodoItem point3 = new TodoItem();

        point1.setTitle("Punkt 1");
        point2.setTitle("Punkt 2");
        point3.setTitle("Punkt 3");

        TodoRepository mockedRepo = Mockito.mock(TodoRepository.class);
        mockedRepo.deleteById(point2.getId());
        Mockito.verify(mockedRepo).deleteById(point2.getId());

    }

}