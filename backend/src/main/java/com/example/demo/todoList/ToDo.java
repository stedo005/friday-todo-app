package com.example.demo.todoList;

import java.util.UUID;

public class ToDo {

    private String Id;
    private String content;
    private boolean status;

    public ToDo() {
        this.Id = UUID.randomUUID().toString();
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
