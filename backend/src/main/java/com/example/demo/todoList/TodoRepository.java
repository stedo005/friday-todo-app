package com.example.demo.todoList;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TodoRepository extends MongoRepository<TodoItem, String> {



}
