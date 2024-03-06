CREATE USER 'cos'@'%' IDENTIFIED BY 'cos1234';
GRANT ALL PRIVILEGES ON *.* TO 'cos'@'%';
CREATE DATABASE cos;

use cos;

select * from book;