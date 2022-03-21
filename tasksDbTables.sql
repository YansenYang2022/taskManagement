
DROP TABLE IF EXISTS `tasks`;
CREATE TABLE `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL COMMENT 'task title',
  `due_date` date DEFAULT NULL COMMENT 'the due date of task',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `operate_log`;
CREATE TABLE `operate_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) DEFAULT NULL COMMENT 'the operation log on a task of id',
  `operate_type` varchar(255) DEFAULT NULL COMMENT 'create,modify,delete',
  `remark` varchar(255) DEFAULT NULL,
  `operator` varchar(255) DEFAULT NULL COMMENT 'the login user who do this operation',
  PRIMARY KEY (`id`),
  KEY `taskid` (`task_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
