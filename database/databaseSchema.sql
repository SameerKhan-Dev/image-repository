\c imagerep;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS images CASCADE;

CREATE TABLE images (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  filePath TEXT,
  description TEXT NOT NULL,
  category TEXT DEFAULT 'OTHER',
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (
    username, email, password)
    VALUES (
    'DevinSanders', 'tristanjacobs@gmail.com', 'hello' );
INSERT INTO users (
    username, email, password)
    VALUES (
    'IvaHarrison', 'allisonjackson@mail.com', 'hello2');

INSERT INTO images (
    owner_id, title, filePath, description, created_at)
    VALUES (
    1,'Football!', 'https://en.wikipedia.org/wiki/Association_football', 'This image is about Soccer!','2018-06-11 04:05:06');
INSERT INTO images(
    owner_id,title, filePath, description, created_at)
    VALUES (
    2,'Baseball!', 'https://en.wikipedia.org/wiki/Baseball', 'This image is about baseball!','2014-04-23 04:05:06');

