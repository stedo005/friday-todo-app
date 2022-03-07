FROM openjdk:17

ADD backend/target/todo-app-backend-0.0.1-SNAPSHOT.jar app.jar

CMD [ "sh", "-c", "java -jar /app.jar"]