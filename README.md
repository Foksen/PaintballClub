# Paintball club

## About
Course work on the subject "Templates of Java language software platforms" on the topic "Paintball club"

Includes frontend (main page and admin panel) and backend (server that processes recording requests and reviews)

## How to run
1. Install **docker** and **docker-compose**

2. Clone the project to your computer (`git clone`)

3. Init `.env` file in the project root (read below)

4. Build the server jar (in server dir run `./gradlew bootJar`  
*NB: Gradle and OpenJDK 21 must be installed)*

5. Run `docker-compose build` in root dir

6. Run `docker-compose up` in root dir

7. Be happy, everything should work :smile:

## Docker Compose environment variables
To run Docker Compose you will need a  `.env` file in the directory with `docker-compose.yml`. It is necessary to define the following variables:

<details>
    <summary>List of variables</summary>

    POSTGRES_DB
    POSTGRES_PASSWORD
    POSTGRES_USER

</details>

<details>
    <summary>Example of .env file</summary>

    POSTGRES_DB=pcmirea_db
    POSTGRES_PASSWORD=admin
    POSTGRES_USER=admin
    
</details>

## Team
<table>
    <tr>
        <th>Name</th>
        <th>Role</th>
    </tr>
    <tr>
        <td>Igor Zholobov</td>
        <td>Full-Stack developer</td>
    </tr>
</table>
