package com.example.demo.todoList;

import com.example.demo.todoList.security.LoginData;
import com.example.demo.todoList.user.UserDetails;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

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

		UserDetails user = new UserDetails();
		user.setEmail("testMail");
		user.setPassword("12345");

		LoginData loginData = new LoginData();
		loginData.setUsername("testMail");
		loginData.setPassword("12345");

		ResponseEntity<UserDetails> responseUserDetails = restTemplate.postForEntity("/users", user, UserDetails.class);
		assertThat(responseUserDetails.getBody().getEmail()).isEqualTo("testMail");

		ResponseEntity<String> responseToken = restTemplate.postForEntity("/login", loginData, String.class);
		assertThat(responseToken.getStatusCode()).isEqualTo(HttpStatus.OK);

		ResponseEntity<TodoItem> addItemResponse = restTemplate.exchange(
				"/todo-app",
				HttpMethod.POST,
				new HttpEntity<>(item1, createHeaders(responseToken.getBody())),
				TodoItem.class
				);

		assertThat(addItemResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
		assertThat(addItemResponse.getBody().getTitle()).isEqualTo("Putzen");

		ResponseEntity<List> listAllItemResponse = restTemplate.exchange(
				"/todo-app/listAllItem",
				HttpMethod.GET,
				new HttpEntity<>(createHeaders(responseToken.getBody())),
				List.class
		);

		assertThat(listAllItemResponse.getBody().size()).isEqualTo(1);

		ResponseEntity<TodoItem> listOneItemResponse = restTemplate.exchange(
				"/todo-app/" + addItemResponse.getBody().getId(),
				HttpMethod.GET,
				new HttpEntity<>(createHeaders(responseToken.getBody())),
				TodoItem.class
		);

		assertThat(listOneItemResponse.getBody().getTitle()).isEqualTo("Putzen");

		ResponseEntity<List> listAllDoneItemResponse = restTemplate.exchange(
				"/todo-app/listAllDoneItem",
				HttpMethod.GET,
				new HttpEntity<>(createHeaders(responseToken.getBody())),
				List.class
		);

		assertThat(listAllDoneItemResponse.getBody().size()).isEqualTo(0);

	}

	private HttpHeaders createHeaders(String token) {
		String authHeader = "Bearer " + token;
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", authHeader);
		return headers;
	}

}
