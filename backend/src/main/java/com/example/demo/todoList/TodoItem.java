package com.example.demo.todoList;

import java.util.UUID;

public class TodoItem {

    private String id;
    private String content;
    private boolean statusDone;


    public TodoItem() {
        this.id = UUID.randomUUID().toString();
        this.statusDone = false;
    }

    public TodoItem(String content) {
        this.content = content;
        this.id = UUID.randomUUID().toString();
        this.statusDone = false;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public boolean isStatusDone() {
        return statusDone;
    }

    public void setStatusDone(boolean statusDone) {
        this.statusDone = statusDone;
    }

    @Override
    public String toString() {
        return content;
    }

}
