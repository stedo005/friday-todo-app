package com.example.demo.todoList;

import com.example.demo.todoList.todo.TodoItem;
import com.example.demo.todoList.todo.TodoRepository;
import com.example.demo.todoList.todo.TodoService;
import com.example.demo.todoList.user.UserDetails;
import com.example.demo.todoList.user.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

class TodoServiceTest {


    @Test
    @DisplayName("should add new Item")
    void test1() {

        TodoItem itemToSave = new TodoItem();
        itemToSave.setTitle("hallo");
        itemToSave.setStatusDone(true);

        TodoItem itemSaved = new TodoItem();
        itemSaved.setId("1");
        itemSaved.setTitle("hallo");
        itemSaved.setStatusDone(false);

        UserDetails user = new UserDetails();
        user.setId("12");
        user.setEmail("test");

        Principal principal = new Principal() {
            @Override
            public String getName() {
                return "test";
            }
        };

        UserRepository mockUserRepo = Mockito.mock(UserRepository.class);
        Mockito.when(mockUserRepo.findByEmail("test")).thenReturn(Optional.of(user));

        TodoRepository mockRepo = Mockito.mock(TodoRepository.class);
        Mockito.when(mockRepo.save(itemToSave)).thenReturn(itemSaved);

        TodoService service = new TodoService(mockRepo, mockUserRepo);
        TodoItem actual = service.addItem(itemToSave, principal);

        Mockito.verify(mockRepo).save(itemToSave);
        Assertions.assertThat(actual).isSameAs(itemSaved);

    }

    @Test
    @DisplayName("should delete 1 item")
    void test2() {

        TodoItem point2 = new TodoItem();
        point2.setTitle("Punkt 2");

        UserDetails user = new UserDetails();
        user.setId("12");
        user.setEmail("test");

        Principal principal = new Principal() {
            @Override
            public String getName() {
                return "test";
            }
        };

        UserRepository mockUserRepo = Mockito.mock(UserRepository.class);
        Mockito.when(mockUserRepo.findByEmail("test")).thenReturn(Optional.of(user));

        TodoRepository mockedRepo = Mockito.mock(TodoRepository.class);

        TodoService service = new TodoService(mockedRepo, mockUserRepo);
        service.deleteItem(point2.getId(), principal);

        Mockito.verify(mockedRepo).deleteTodoItemByIdAndUserId(point2.getId(), "12");

    }

    @Test
    @DisplayName("should list all Item")
    void test3() {

        TodoItem item1 = new TodoItem();
        TodoItem item2 = new TodoItem();

        UserDetails user = new UserDetails();
        user.setId("12");
        user.setEmail("test");

        Principal principal = new Principal() {
            @Override
            public String getName() {
                return "test";
            }
        };

        UserRepository mockUserRepo = Mockito.mock(UserRepository.class);
        Mockito.when(mockUserRepo.findByEmail("test")).thenReturn(Optional.of(user));

        TodoRepository mockRepo = Mockito.mock(TodoRepository.class);
        Mockito.when(mockRepo.findAllByUserId("12")).thenReturn(List.of(item1, item2));

        TodoService service = new TodoService(mockRepo, mockUserRepo);
        List<TodoItem> actual = service.listAllItem(principal);

        Assertions.assertThat(actual.size()).isEqualTo(2);

    }

    @Test
    @DisplayName("should list one Item")
    void test4() {

        TodoItem item = new TodoItem();
        item.setId("1");

        UserDetails user = new UserDetails();
        user.setId("12");
        user.setEmail("test");

        Principal principal = new Principal() {
            @Override
            public String getName() {
                return "test";
            }
        };

        UserRepository mockUserRepo = Mockito.mock(UserRepository.class);
        Mockito.when(mockUserRepo.findByEmail("test")).thenReturn(Optional.of(user));

        TodoRepository mockedRepo = Mockito.mock(TodoRepository.class);
        Mockito.when(mockedRepo.findById("1")).thenReturn(Optional.of(item));

        TodoService service = new TodoService(mockedRepo, mockUserRepo);

        Optional<TodoItem> actual = service.listOneItem("1");

        Assertions.assertThat(actual).contains(item);
    }

    @Test
    @DisplayName("should change Status for 1 item")
    void test5() {

        TodoItem itemToChange = new TodoItem();
        itemToChange.setId("1");
        itemToChange.setStatusDone(false);

        UserDetails user = new UserDetails();
        user.setId("12");
        user.setEmail("test");

        Principal principal = new Principal() {
            @Override
            public String getName() {
                return "test";
            }
        };

        UserRepository mockUserRepo = Mockito.mock(UserRepository.class);
        Mockito.when(mockUserRepo.findByEmail("test")).thenReturn(Optional.of(user));

        Optional<TodoItem> actual = Optional.of(itemToChange);

        TodoRepository mockRepo = Mockito.mock(TodoRepository.class);
        Mockito.when(mockRepo.findById("1")).thenReturn(actual);
        TodoService service = new TodoService(mockRepo, mockUserRepo);

        service.changeStatus(actual.get().getId());
        Assertions.assertThat(actual.get().isStatusDone()).isTrue();

    }

    @Test
    @DisplayName("should change content of 1 item")
    void test6() {

        TodoItem itemToChange = new TodoItem();
        itemToChange.setId("1");
        itemToChange.setTitle("Putzen");
        itemToChange.setTask("heute");
        itemToChange.setStatusDone(false);

        TodoItem changedItem = new TodoItem();
        changedItem.setId("1");
        changedItem.setTitle("Putzen");
        changedItem.setTask("morgen");
        changedItem.setStatusDone(false);

        UserDetails user = new UserDetails();
        user.setId("12");
        user.setEmail("test");

        Principal principal = new Principal() {
            @Override
            public String getName() {
                return "test";
            }
        };

        UserRepository mockUserRepo = Mockito.mock(UserRepository.class);
        Mockito.when(mockUserRepo.findByEmail("test")).thenReturn(Optional.of(user));

        Optional<TodoItem> opItemToChange = Optional.of(itemToChange);

        TodoRepository mockRepo = Mockito.mock(TodoRepository.class);
        Mockito.when(mockRepo.findById("1")).thenReturn(opItemToChange);
        TodoService service = new TodoService(mockRepo, mockUserRepo);

        service.changeContent("1", changedItem);

        Assertions.assertThat(itemToChange.getTask()).isEqualTo("morgen");

    }

    @Test
    @DisplayName("should list all done item")
    void test7() {

        TodoItem item1 = new TodoItem();
        TodoItem item2 = new TodoItem();
        TodoItem item3 = new TodoItem();

        item1.setStatusDone(true);
        item2.setStatusDone(false);
        item3.setStatusDone(false);

        UserDetails user = new UserDetails();
        user.setId("12");
        user.setEmail("test");

        Principal principal = new Principal() {
            @Override
            public String getName() {
                return "test";
            }
        };

        UserRepository mockUserRepo = Mockito.mock(UserRepository.class);
        Mockito.when(mockUserRepo.findByEmail("test")).thenReturn(Optional.of(user));

        TodoRepository mockRepo = Mockito.mock(TodoRepository.class);
        Mockito.when(mockRepo.findAllByStatusDoneTrueAndUserId("12")).thenReturn(List.of(item1));

        TodoService service = new TodoService(mockRepo, mockUserRepo);
        List<TodoItem> actual = service.listAllDone(principal);

        Assertions.assertThat(actual.size()).isEqualTo(1);
        Assertions.assertThat(actual.get(0).isStatusDone()).isTrue();

    }

}