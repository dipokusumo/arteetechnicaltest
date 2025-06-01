DROP DATABASE IF EXISTS arteetechnicaltestdb;
CREATE DATABASE arteetechnicaltestdb;
USE arteetechnicaltestdb;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    isDone BOOLEAN DEFAULT FALSE,
    deadline DATE NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (email, name, password) VALUES
('user@email.com', 'User', '12345678');

INSERT INTO tasks (title, isDone, deadline, user_id) VALUES
('test 1', false, '2025-06-15', 1),
('test 2', true, '2025-06-10', 1);