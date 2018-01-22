/* authenticate stored procedure */
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

/* get_entries stored procedure */
DELIMITER //
CREATE PROCEDURE `get_entries` ()
LANGUAGE SQL
DETERMINISTIC
SQL SECURITY DEFINER
BEGIN
	SELECT id, header, body, creation_date
	FROM entries
	ORDER BY id DESC;
END//

/* create_entry stored procedure */
DELIMITER //
CREATE PROCEDURE `create_entry` (
	header VARCHAR(20),
	body TEXT(65535)
)
LANGUAGE SQL
DETERMINISTIC
SQL SECURITY DEFINER
BEGIN
  INSERT INTO entries (header, body, creation_date)
	VALUES (header, body, now());
END//

/* change_entry stored procedure */
DELIMITER //
CREATE PROCEDURE `change_entry` (
	id INT(11),
	header CHAR(20),
	body TEXT
)
LANGUAGE SQL
DETERMINISTIC
SQL SECURITY DEFINER
BEGIN
  UPDATE entries
  SET header = header, body = body
  WHERE entries.id = id;
END//
