package com.example.demo.todoList;

import java.util.UUID;

public class ToDo {

    private String id;
    private String content;
    private boolean status;


    public ToDo() {
        this.id = UUID.randomUUID().toString();
        this.status = false;
    }

    public ToDo(String content) {
        this.content = content;
        this.id = UUID.randomUUID().toString();
        this.status = false;
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

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return ""+content+" "+status ;
    }
}
