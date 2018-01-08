DELIMITER //
CREATE PROCEDURE `authenticate` (
	username varchar(11),
	password varchar(64)
)

LANGUAGE SQL
DETERMINISTIC
SQL SECURITY DEFINER
BEGIN
  SELECT * FROM users
  WHERE users.username = username
  AND users.password = password;
END//