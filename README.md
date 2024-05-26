# Paintball club

## About
Course work on the subject "Templates of Java language software platforms" on the topic "Paintball club"

Includes frontend (main page and admin panel) and backend (server that processes recording requests and reviews)

## Content

* [Technologies](#technologies)
* [How to run](#how-to-run)
* [Docker Compose environment variables](#docker-compose-environment-variables)
* [Admin panel](#admin-panel)
* [Team](#team)

## Technologies

### Frontend
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)


### Backend
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Gradle](https://img.shields.io/badge/Gradle-02303A.svg?style=for-the-badge&logo=Gradle&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)

### Database
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Hibernate](https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=Hibernate&logoColor=white)

### REST
![JSON](https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

### Containerization & orchestration
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

*P.s: I liked inserting icons :relaxed:*

## How to run
1. Install **docker** and **docker-compose**

2. Clone the project to your computer (`git clone`)

3. Init `.env` file in the project root (read below)

4. Run `docker-compose build` in the root dir to get the image with the server

5. Run `docker-compose up` in the root dir to start the server (to prevent control of the terminal, use `docker-compose up -d`).

6. Be happy, everything should work :smile:

## Docker Compose environment variables
To run Docker Compose you will need a `.env` file in the directory with `docker-compose.yml`. The repository contains file `.env.example`, you can copy it, rename it and add/edit variables.

## Admin panel

To log in to the admin panel, use login `superboss` and password `superboss`.

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
