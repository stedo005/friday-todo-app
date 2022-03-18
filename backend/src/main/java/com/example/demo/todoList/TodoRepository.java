package com.example.demo.todoList;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TodoRepository extends MongoRepository<TodoItem, String> {

    List<TodoItem> findAllByStatusDoneTrueAndUserId(String userId);
    List<TodoItem> findAllByUserId(String userId);
    void deleteTodoItemByIdAndUserId(String id, String userId);
    void deleteAllByStatusDoneTrueAndUserId(String userId);

}
