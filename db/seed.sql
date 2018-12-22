DROP DATABASE IF EXISTS biologyresearch;
CREATE DATABASE biologyresearch;

\c biologyresearch;

-- Researchers
CREATE TABLE researchers (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  job_title VARCHAR,
);
-- Species
CREATE TABLE species(
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  is_mammal BOOLEAN
);
-- Animals
CREATE TABLE animals(
  id SERIAL PRIMARY KEY,
  species_id INT REFERENCES species(id),
  nickname VARCHAR NOT NULL
);
--Habitats
CREATE TABLE habitats(
  id SERIAL PRIMARY KEY,
  category VARCHAR
);
--Taggings
CREATE TABLE taggings(
  id SERIAL PRIMARY KEY,
  animal_id INT REFERENCES animals(id) ON DELETE CASCADE,
  researcher_id INT REFERENCES researchers(id) ON DELETE SET NULL
);
--Sightings
CREATE TABLE sightings(
  id SERIAL PRIMARY KEY,
  researcher_id INT REFERENCES researchers(id) ON DELETE SET NULL,
  species_id INT REFERENCES species(id) ON DELETE CASCADE,
  habitat_id INT REFERENCES habitats(id)
);

INSERT INTO researchers (name, job_title)
VALUES('Mariana Aleta', 'Project Lead'), ('Javed Patrick', 'Senior Field Researcher'), ('Carolina Itai', 'Field Researcher'), ('Jazmyn Gottfried', 'Field Researcher'), ('Ezra Flip', 'Research Intern');

INSERT INTO species (name, is_mammal)
VALUES('Dolphin', 'true'), ('Moray Eel', 'false'), ('Tiger Shark', 'false'), ('Orca Whale', 'true'), ('Moon Jelly', 'false');

INSERT INTO animals (species_id, nickname) --
VALUES(1, 'Flip'), (1, 'Skip'), (2, 'Jenkins'), (3, 'Sally'), (5, 'Flapjack'), (5, 'Gibbous'), (5, 'Nox');

INSERT INTO habitats (category)
VALUES('Shallows'), ('Coral Reef'), ('Tide Pools'), ('Deeps');

INSERT INTO taggings (animal_id, researcher_id) --JOIN TABLE--
VALUES(1, 5), (2, 3), (3, 1), (4, 2), (5, 4), (6, 4), (7, 2);

INSERT INTO sightings (species_id, researcher_id, habitat_id) --JOIN TABLE--
VALUES(4, 4, 4), (3, 1, 4), (5, 3, 3), (2, 5, 2), (1, 2, 1), (2, 5, 1);
