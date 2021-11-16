
FROM maven:3.6.0-jdk-11-slim AS build
COPY src /usr/src/app/src  
COPY pom.xml /usr/src/app  
RUN mvn -f /usr/src/app/pom.xml clean package -DskipTests


FROM openjdk:11
EXPOSE 8080
COPY --from=build /usr/src/app/target/demo-docker.jar /usr/app/demo-docker.jar  
ENTRYPOINT ["java","-jar","/usr/app/demo-docker.jar"]