# Stage 1: Build the JAR using Maven
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
# Copy the pom.xml and source code
COPY pom.xml .
COPY src ./src
# Build the application (this creates the target folder and the jar)
RUN mvn clean package -DskipTests

# Stage 2: Run the JAR using JDK
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
# Copy only the built jar from the previous stage
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
