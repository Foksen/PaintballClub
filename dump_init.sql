--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE pcmirea_db;




--
-- Drop roles
--

DROP ROLE admin;


--
-- Roles
--

CREATE ROLE admin;
ALTER ROLE admin WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:9R0a4Bx3DnJIzUREq8jtTw==$kKi8XbzIJYkmUd+suBMMEKYvm90gg/d7/0LabqKTjjI=:wITuqP0g8woov5QeR/zwwnawvr5eIYKZmTzpukDVP/4=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: admin
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO admin;

\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: admin
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: admin
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: admin
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "pcmirea_db" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pcmirea_db; Type: DATABASE; Schema: -; Owner: admin
--

CREATE DATABASE pcmirea_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE pcmirea_db OWNER TO admin;

\connect pcmirea_db

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin_emails; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.admin_emails (
    id integer NOT NULL,
    email character varying(256)
);


ALTER TABLE public.admin_emails OWNER TO admin;

--
-- Name: admin_emails_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.admin_emails_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_emails_id_seq OWNER TO admin;

--
-- Name: admin_emails_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.admin_emails_id_seq OWNED BY public.admin_emails.id;


--
-- Name: packets; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.packets (
    id integer NOT NULL,
    name character varying(32)
);


ALTER TABLE public.packets OWNER TO admin;

--
-- Name: packets_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.packets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.packets_id_seq OWNER TO admin;

--
-- Name: packets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.packets_id_seq OWNED BY public.packets.id;


--
-- Name: registration_states; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.registration_states (
    id integer NOT NULL,
    state character varying(32)
);


ALTER TABLE public.registration_states OWNER TO admin;

--
-- Name: registration_state_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.registration_state_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.registration_state_id_seq OWNER TO admin;

--
-- Name: registration_state_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.registration_state_id_seq OWNED BY public.registration_states.id;


--
-- Name: registrations; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.registrations (
    id integer NOT NULL,
    name character varying(64),
    email character varying(256),
    date timestamp without time zone,
    comment text,
    packet_id integer,
    state_id integer
);


ALTER TABLE public.registrations OWNER TO admin;

--
-- Name: registrations_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.registrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.registrations_id_seq OWNER TO admin;

--
-- Name: registrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.registrations_id_seq OWNED BY public.registrations.id;


--
-- Name: review_states; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.review_states (
    id integer NOT NULL,
    state character varying(32)
);


ALTER TABLE public.review_states OWNER TO admin;

--
-- Name: review_states_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.review_states_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.review_states_id_seq OWNER TO admin;

--
-- Name: review_states_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.review_states_id_seq OWNED BY public.review_states.id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    name character varying(64),
    email character varying(256),
    experience character varying(64),
    text text,
    date timestamp without time zone,
    state_id integer
);


ALTER TABLE public.reviews OWNER TO admin;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_id_seq OWNER TO admin;

--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- Name: admin_emails id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.admin_emails ALTER COLUMN id SET DEFAULT nextval('public.admin_emails_id_seq'::regclass);


--
-- Name: packets id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.packets ALTER COLUMN id SET DEFAULT nextval('public.packets_id_seq'::regclass);


--
-- Name: registration_states id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registration_states ALTER COLUMN id SET DEFAULT nextval('public.registration_state_id_seq'::regclass);


--
-- Name: registrations id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registrations ALTER COLUMN id SET DEFAULT nextval('public.registrations_id_seq'::regclass);


--
-- Name: review_states id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.review_states ALTER COLUMN id SET DEFAULT nextval('public.review_states_id_seq'::regclass);


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- Data for Name: admin_emails; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.admin_emails (id, email) FROM stdin;
1	test1@gmail.com
2	test2@gmail.com
\.


--
-- Data for Name: packets; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.packets (id, name) FROM stdin;
1	knowing
2	begginner
3	amateur
4	professional
\.


--
-- Data for Name: registration_states; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.registration_states (id, state) FROM stdin;
1	accept
2	consider
3	reject
\.


--
-- Data for Name: registrations; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.registrations (id, name, email, date, comment, packet_id, state_id) FROM stdin;
1	Игорь Жолобов	test1@gmail.com	2024-05-08 12:42:15	3 человека, 12:00	1	2
2	Антон Смирнов	test3@gmail.com	2024-05-08 13:12:23	5 человек, любое время	2	1
\.


--
-- Data for Name: review_states; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.review_states (id, state) FROM stdin;
1	accept
2	consider
3	reject
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.reviews (id, name, email, experience, text, date, state_id) FROM stdin;
1	Игорь Жолобов	test1@gmail.com	1 год	Всё очень понравилось!	2024-05-07 01:07:38	1
2	Сергей Воронков	test2@gmail.com	2 месяца	Просто супер!	2024-05-07 02:11:42	2
\.


--
-- Name: admin_emails_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.admin_emails_id_seq', 2, true);


--
-- Name: packets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.packets_id_seq', 4, true);


--
-- Name: registration_state_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.registration_state_id_seq', 3, true);


--
-- Name: registrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.registrations_id_seq', 2, true);


--
-- Name: review_states_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.review_states_id_seq', 3, true);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.reviews_id_seq', 2, true);


--
-- Name: admin_emails admin_emails_email_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.admin_emails
    ADD CONSTRAINT admin_emails_email_key UNIQUE (email);


--
-- Name: admin_emails admin_emails_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.admin_emails
    ADD CONSTRAINT admin_emails_pkey PRIMARY KEY (id);


--
-- Name: packets packets_name_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.packets
    ADD CONSTRAINT packets_name_key UNIQUE (name);


--
-- Name: packets packets_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.packets
    ADD CONSTRAINT packets_pkey PRIMARY KEY (id);


--
-- Name: registration_states registration_state_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registration_states
    ADD CONSTRAINT registration_state_pkey PRIMARY KEY (id);


--
-- Name: registration_states registration_state_state_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registration_states
    ADD CONSTRAINT registration_state_state_key UNIQUE (state);


--
-- Name: registrations registrations_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registrations
    ADD CONSTRAINT registrations_pkey PRIMARY KEY (id);


--
-- Name: review_states review_states_name_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.review_states
    ADD CONSTRAINT review_states_name_key UNIQUE (state);


--
-- Name: review_states review_states_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.review_states
    ADD CONSTRAINT review_states_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: reviews fk_review_state; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_review_state FOREIGN KEY (state_id) REFERENCES public.review_states(id);


--
-- Name: registrations registrations_packet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registrations
    ADD CONSTRAINT registrations_packet_id_fkey FOREIGN KEY (packet_id) REFERENCES public.packets(id);


--
-- Name: registrations registrations_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registrations
    ADD CONSTRAINT registrations_state_id_fkey FOREIGN KEY (state_id) REFERENCES public.registration_states(id);


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: admin
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO admin;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: admin
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

