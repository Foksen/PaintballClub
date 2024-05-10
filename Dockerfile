FROM openjdk:22
COPY ./server/out/artifacts/pcmirea_jar/pcmirea.jar /usr/src/myapp/app.jar
EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "/usr/src/myapp/app.jar" ]