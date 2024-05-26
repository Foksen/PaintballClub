FROM gradle:8.7-jdk21-alpine AS BUILD
COPY . /app
WORKDIR /app
RUN gradle compileJava && gradle test && gradle build

FROM openjdk:21
EXPOSE 8080
COPY --from=BUILD /app/build/libs/pcmirea-1.0.0.jar /app/pcmirea-1.0.0.jar
WORKDIR /app
CMD [ "java", "-jar", "pcmirea-1.0.0.jar"]