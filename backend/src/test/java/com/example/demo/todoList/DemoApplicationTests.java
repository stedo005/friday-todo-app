package com.example.demo.todoList;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class DemoApplicationTests {

	@Autowired
	private TestRestTemplate restTemplate;

	@Test
	@DisplayName("Integration test")
	void test1() {

		TodoItem item1 = new TodoItem();
		TodoItem item2 = new TodoItem();
		TodoItem item3 = new TodoItem();

		item1.setTitle("Putzen");
		item2.setTitle("Waschen");
		item3.setStatusDone(true);

		ResponseEntity<TodoItem> postResponse = restTemplate.postForEntity("/todo-app", item1, TodoItem.class);
		assertThat(postResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		assertThat(postResponse.getBody().getTitle()).isEqualTo("Putzen");
		assertThat(postResponse.getBody().isStatusDone()).isFalse();

		ResponseEntity<TodoItem> getResponse = restTemplate.getForEntity("/todo-app/" + postResponse.getBody().getId(), TodoItem.class);
		assertThat(getResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		assertThat(getResponse.getBody().getTitle()).isEqualTo("Putzen");

		ResponseEntity<List> secondGet = restTemplate.getForEntity("/todo-app/listAllItem", List.class);
		assertThat(secondGet.getBody().size()).isEqualTo(1);

		ResponseEntity<List> thirdGet = restTemplate.getForEntity("/todo-app/listAllDoneItem", List.class);
		assertThat(thirdGet.getBody().size()).isEqualTo(0);

	}

}
