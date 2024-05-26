INSERT INTO review_states (id, name) VALUES
    (1, 'accept'),
    (2, 'consider'),
    (3, 'reject')
ON CONFLICT DO NOTHING;

INSERT INTO packets (id, name) VALUES
    (1, 'knowing'),
    (2, 'beginner'),
    (3, 'amateur'),
    (4, 'professional')
ON CONFLICT DO NOTHING;

INSERT INTO registration_states (id, name) VALUES
    (1, 'accept'),
    (2, 'consider'),
    (3, 'reject')
ON CONFLICT DO NOTHING;

--
-- !!! ENCODING DOESN'T WORK, IDK WHY !!!
--
--INSERT INTO reviews (id, name, email, experience, text, date, state_id) VALUES
--    (1, 'Игорь Жолобов', 'izholobov@gmail.com', '2 года', 'Я хотел бы выразить благодарность всему коллективу пейнтбольного клуба «МИРЭА» за прекрасно проведённое время! Всё было организовано на высшем уровне, отдельное спасибо инструкторам за интересные сценарии игр и весёлую атмосферу. Вернусь к вам снова!', '2024-05-11 08:15:52', 1),
--    (2, 'Сергей Воронков', 'svoronkov@yandex.ru', '5 месяцев', 'Пейнтбольный клуб «МИРЭА» — это отличное место для активного отдыха. Всегда радует глаз ухоженная территория, приветливый персонал и качественное оборудование. Хочется возвращаться сюда снова и снова, чтобы отдохнуть и получить заряд позитива. Спасибо вам большое!', '2024-05-11 08:16:29', 1),
--    (3, 'Антон Смирнов', 'asmirnov@mail.ru', '6 лет', 'Пейнтбольный клуб «МИРЭА» оставил после себя самые приятные впечатления. Отличная площадка для игры, разнообразные сценарии, вежливые инструкторы и хорошая компания — всё это сделало наш отдых незабываемым. Большое спасибо!', '2024-05-11 08:17:16', 1)
--ON CONFLICT DO NOTHING;
--
--INSERT INTO registrations (id, name, email, date, comment, packet_id, state_id) VALUES
--    (1, 'Игорь Жолобов', 'izholobov@gmail.com', '2024-05-25 11:40:32', '2 человека, 15:00-17:00', 1, 2),
--    (2, 'Антон Смирнов', 'asmirnov@mail.ru', '2024-05-26 10:12:59', '6 человек, с 12:00', 3, 2)
--ON CONFLICT DO NOTHING;
--

INSERT INTO users (id, username, password, role) VALUES
    (1, 'superboss', '$2a$05$Et0crGQYHz1Z7jqhPUiUzeLthX0XsTS63cA4SkTx/QgUEH3XnwHEa', 'ROLE_SUPERBOSS')
ON CONFLICT DO NOTHING;