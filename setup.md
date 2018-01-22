# Setup
## Databse
```sql
CREATE USER 'fabian'@'localhost' IDENTIFIED BY 'abc123';
GRANT ALL PRIVILEGES ON *.* TO 'fabian'@'localhost'
	WITH GRANT OPTION;
CREATE USER 'fabian'@'%' IDENTIFIED BY 'abc123';
GRANT ALL PRIVILEGES ON *.* TO 'fabian'@'%'
	WITH GRANT OPTION;

CREATE TABLE `entries` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `header` char(20) DEFAULT NULL,
  `body` text,
  `creation_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

CREATE TABLE `entry_comments` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) unsigned NOT NULL,
  `author` char(11) DEFAULT NULL,
  `content` longtext,
  PRIMARY KEY (`id`),
  KEY `entry_id` (`entry_id`),
  CONSTRAINT `entry_comments_ibfk_1` FOREIGN KEY (`entry_id`) REFERENCES `entries` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(11) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `authenticate`(
	username varchar(11),
	password varchar(64)
)
    DETERMINISTIC
BEGIN
   SELECT * FROM users
   WHERE users.username = username
   AND users.password = password;
END;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `change_entry`(
	id INT(11),
	header CHAR(20),
	body TEXT
)
    DETERMINISTIC
BEGIN
  UPDATE entries
  SET header = header, body = body
  WHERE entries.id = id;
END;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_entry`(
	header VARCHAR(20),
	body TEXT(65535)
)
    DETERMINISTIC
BEGIN
  INSERT INTO entries (header, body, creation_date)
	VALUES (header, body, now());
END;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_entries`()
    DETERMINISTIC
BEGIN
	SELECT id, header, body, creation_date
	FROM entries
	ORDER BY id DESC;
END;;
DELIMITER ;

INSERT INTO `entries` (`header`, `body`, `creation_date`)
VALUES
	('# About', '## Why\nMy goal with this project was, to get better in writing front-end web applications. Although I\'ve previously created projects, which involved creating a web page, the focus never solely was the frontend. \n\n## How\nOf course, if you want to be a good web dev today, plain JS won\'t cut it anymore. So I created this page with the React framework. My experience with it has been mixed, but over all very positive. I say mixed because many tings in the beginning were confusing and frustrating to me. \n\nThe backend was written in Nodejs. This wasn\'t a challenge since I\'ve created previous backends using Node. \n\nThe database is a MySQL database. The backend communicates with it over stored procedures.\n\n\n## Features\n### Highlighting code-snippets\n```js\nconst greet = () => console.log(\"Hello world\")\nlet foo = (bar) => {\n  bar()\n}\n```\n\n### Parsing markdown\nThe text you\'re reading right now, is stored as a [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) string in the database. The client parses this markdown to HTML.\n\n### Admin controls\nIf you have an admin account, you can log in with your credentials in the \"Admin\" tab. After your\'re successfully logged in, you can create and change posts in the frontend\n\n![test](https://images.unsplash.com/photo-1506715542320-1bc96262859a?auto=format&fit=crop&w=9000&q=80%209000w)\n', '2018-01-13');

INSERT INTO `users` (`id`, `username`, `password`)
VALUES
	(1, 'admin', '6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090');
```

## Docker container
```bash
cd my_blog/implementation
docker build -t fabianbaechli/my_blog .
docker run --add-host=host:<ip adresse (e.g.: 192.168.1.192)> -p 8080:8080 -d fabianbaechli/my_blog
```
