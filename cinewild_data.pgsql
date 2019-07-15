CREATE TABLE movies (
  id serial,
  movie_name character varying(50),
  image character varying (255)
);

CREATE TYPE lang as ENUM('cn', 'en', 'fr')

CREATE TABLE movies_languages(
  movie_id int,
  language lang
);

INSERT INTO movies(movie_name,image)
VALUES(
  'Kungfu Panda', 
  'https://image.tmdb.org/t/p/w600_and_h900_bestv2/b1JzFepXblNHnbOkqZBk9mK7go0.jpg'
),
(
  'Transformers',
  'https://image.tmdb.org/t/p/w185_and_h278_bestv2/hEQVXq0Fg8cwBld7xdxf52VLwkS.jpg'
),
(
  'Avengers: Endgame',
  'https://image.tmdb.org/t/p/w600_and_h900_bestv2/zEGv6yg9G19yqdvMo2dQy2OqKCI.jpg'
),
(
  'Sherlock Holmes',
  'https://image.tmdb.org/t/p/w600_and_h900_bestv2/cvbsO7oyZQbBeI8RZ9aw85JvAO9.jpg'
),
(
  'Jumanji: Bienvenue dans la jungle',
  'https://image.tmdb.org/t/p/w600_and_h900_bestv2/y1zgYmxkQDvi9Tev74PYbmer2Mv.jpg'
),
(
  'Karaté Kid',
  'https://image.tmdb.org/t/p/w600_and_h900_bestv2/7xC0Neq5GVzJYjXpdSxGiUaFzRq.jpg'
);

INSERT INTO movies_languages (movie_id,language) VALUES 
( 3, 'cn' ),
( 3, 'fr' ),
( 3, 'en' ),
( 4, 'en' ),
( 5, 'en' ),
( 5, 'fr' ),
( 8, 'cn' ),
( 8, 'fr' ),
( 9, 'en' ),
( 9, 'fr' ),
( 10, 'en' ),
( 10, 'fr' );


-- Simple select for movies
SELECT * FROM movies;

-- Selecting all movies for a given language

SELECT
  *
FROM
  movies
  INNER JOIN movies_languages ON movies.id = movies_languages.movie_id
WHERE
  movies_languages.language = 'en';

-- Selecting all movies for multiple given languages

SELECT
  DISTINCT *
FROM
  movies
  INNER JOIN movies_languages ON movies.id = movies_languages.movie_id
WHERE
  movies_languages.language in ('fr', 'cn');


