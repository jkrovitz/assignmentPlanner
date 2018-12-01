
DROP SCHEMA IF EXISTS flaskapp2;
CREATE SCHEMA flaskapp2;
USE flaskapp2;


CREATE TABLE categoryTable
(
CategoryId int,
categoryName varchar(255),
categoryColor varchar(255),
PRIMARY KEY (CategoryId)
);