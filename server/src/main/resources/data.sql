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
