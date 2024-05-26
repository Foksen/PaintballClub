CREATE TABLE IF NOT EXISTS admin_emails (
    id SERIAL PRIMARY KEY,
    email VARCHAR(256)
);

CREATE TABLE IF NOT EXISTS review_states (
    id SERIAL PRIMARY KEY,
    name VARCHAR(32)
);

CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64),
    email VARCHAR(256),
    experience VARCHAR(64),
    text TEXT,
    date TIMESTAMP,
    state_id INTEGER,

    FOREIGN KEY(state_id) REFERENCES review_states(id)
);

CREATE TABLE IF NOT EXISTS packets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(32)
);

CREATE TABLE IF NOT EXISTS registration_states (
    id SERIAL PRIMARY KEY,
    name VARCHAR(32)
);

CREATE TABLE IF NOT EXISTS registrations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64),
    email VARCHAR(256),
    date TIMESTAMP,
    comment TEXT,
    packet_id INTEGER,
    state_id INTEGER,

    FOREIGN KEY(packet_id) REFERENCES packets(id),
    FOREIGN KEY(state_id) REFERENCES review_states(id)
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(32) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    role VARCHAR(32) NOT NULL
);