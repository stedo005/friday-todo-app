package com.example.demo.todoList.user;

import com.example.demo.todoList.TodoItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<UserDetails, String> {

    Optional<UserDetails> findByEMail(String username);

}
