-- SQLBook: Code
-- database name: mbti_edu
create database mbti_edu;

--GROUP: Authorization
--Tabel "user" digunakan untuk menyimpan data pengguna yang melakukan registrasi.
CREATE TABLE user (
  userId INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) not null,
  email VARCHAR(50) UNIQUE,
  password VARCHAR(20) not null,
  gender VARCHAR(10) not null,
  birthdate DATE
);

-- data dump tabel user
insert into user values 
(1, 'example', 'example123@gmail.com', 'example123', 'female', '1990-01-01');

--Tabel "Session" digunakan untuk menyimpan informasi sesi login pengguna, termasuk token akses.
CREATE TABLE session (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT,
  token VARCHAR(255),
  FOREIGN KEY (userId) REFERENCES user(id)
);

-- data dump session
insert into session values (
  1, 1, 'abcde12345');

--GROUP: MBTI
--Tabel "Result" digunakan untuk menyimpan hasil tes MBTI yang telah dijalankan.
CREATE TABLE result (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT,
  mbti VARCHAR(6),
  FOREIGN KEY (userId) REFERENCES user(id)
);

-- data dump result
insert into result values (
  1, 1, 'INFP');
