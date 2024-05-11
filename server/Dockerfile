FROM openjdk:22
COPY ./build/libs/pcmirea-1.0.0.jar /usr/src/myapp/app.jar
EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "/usr/src/myapp/app.jar" ]