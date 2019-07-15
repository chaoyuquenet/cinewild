

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
   DISTINCT movies.id, movie_name, image
FROM
  movies
  INNER JOIN movies_languages ON movies.id = movies_languages.movie_id
WHERE
  movies_languages.language in ('en', 'cn')

-- Selecting all movies filtering by actor  

SELECT
   DISTINCT movies.id, movie_name, image
FROM
  movies
  INNER JOIN movies_actors ON movies.id = movies_actors.movie_id
  INNER JOIN actors ON movies_actors.actor_id = actors.id
WHERE
  actors.first_name = 'Jack'

-- Select all movies filtering by movie name 
SELECT
  *
FROM
  movies
WHERE
  movie_name LIKE '%k%';


CREATE TABLE types (
  id serial,
  type_name character varying(20)
);

CREATE TABLE movies_types(
  movie_id int,
  type_id int
);


SELECT * FROM movies;
select * from types;

INSERT INTO types (type_name) VALUES 
('Animation'), 
('Comédie'),
('Science-Fiction'),
('Action');

INSERT INTO movies_types (movie_id, type_id) VALUES 
(3,1),
(3,2),
(3,4),
(4,3),
(4,4),
(5,3),
(5,4),
(8,2),
(8,4),
(9,3),
(9,4),
(10,2),
(10,3);

-- Get all movies in inserted order
SELECT * FROM movies

-- Get properties from all movies
SELECT * FROM types;
SELECT * FROM language;

-- Get one movie by its ID
SELECT * FROM movies WHERE id = 3;

-- Search Movie by title or type or language
SELECT
  DISTINCT movies.id, movies.movie_name, movies.image
FROM
  movies
  INNER JOIN movies_languages ON movies.id = movies_languages.movie_id
  INNER JOIN movies_types ON movies.id = movies_types.movie_id
  INNER JOIN types ON movies_types.type_id = types.id
WHERE movies.movie_name LIKE '%Tran%'
  OR types.type_name = 'Animation'
  OR movies_languages.language IN ('cn');


-- Add a new movie
INSERT INTO
  movies (movie_name, image)
VALUES
  ('Jurassik World', 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/aTxRptK9fG3a0Tmcym3h4LXFOlm.jpg')
RETURNING id;

INSERT INTO
  movies_languages (movie_id, language)
VALUES
  (12, 'cn'),
  (12, 'en');

INSERT INTO movies_types (movie_id, type_id)
VALUES (12,3), (12,4);


-- Delete a movie by id
DELETE FROM movies WHERE id = 11;



-- Search Movies, returns name only, for autocomplete purpose
SELECT
  movie_name
FROM movies
WHERE
  upper(movies.movie_name) LIKE CONCAT('%', upper('k'), '%');




DROP TABLE actors;

select * from movies;
select * from movies_types;
select * from types;

DELETE FROM movies WHERE movie_name='Titanic';