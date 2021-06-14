import {MigrationInterface, QueryRunner} from "typeorm";

export class initialEntities1623664213365 implements MigrationInterface {
    name = 'initialEntities1623664213365'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `vote` (`userid` varchar(255) NOT NULL, `postid` varchar(255) NOT NULL, `upvote` tinyint NOT NULL DEFAULT 0, `downvote` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (`userid`, `postid`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `post` (`id` varchar(36) NOT NULL, `title` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `content` text NOT NULL, `time` datetime NOT NULL, `userid` varchar(255) NOT NULL, `votes` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `user` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `comment_vote` (`userid` varchar(255) NOT NULL, `commentid` varchar(255) NOT NULL, `upvote` tinyint NOT NULL DEFAULT 0, `downvote` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (`userid`, `commentid`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `comment` (`id` varchar(36) NOT NULL, `body` text NOT NULL, `userid` varchar(255) NOT NULL, `postid` varchar(255) NOT NULL, `timestamp` datetime NOT NULL, `likes` int NOT NULL DEFAULT 0, `dislikes` int NOT NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `Galahad`.`comment` DROP FOREIGN KEY `FK_e44f582604d79b2dc5af7a9d9c7`", undefined);
        await queryRunner.query("ALTER TABLE `Galahad`.`vote` DROP FOREIGN KEY `FK_f0861d36213da1a5c6a68ca3fef`", undefined);
        await queryRunner.query("ALTER TABLE `Galahad`.`comment` DROP FOREIGN KEY `FK_d6139c3f5f3069f0269e1e48f69`", undefined);
        await queryRunner.query("ALTER TABLE `Galahad`.`comment_vote` DROP FOREIGN KEY `FK_824e78ab993c230e64a4001478b`", undefined);
        await queryRunner.query("ALTER TABLE `Galahad`.`post` DROP FOREIGN KEY `FK_c9a65a5c8a51ceaa19e4b1a5352`", undefined);
        await queryRunner.query("ALTER TABLE `Galahad`.`vote` DROP FOREIGN KEY `FK_d9a709c32985e9a425b67b0974f`", undefined);
        await queryRunner.query("ALTER TABLE `Galahad`.`comment_vote` DROP FOREIGN KEY `FK_5fe871f153624e152f2dd3de12b`", undefined);
        await queryRunner.query("ALTER TABLE `vote` ADD CONSTRAINT `FK_d9a709c32985e9a425b67b0974f` FOREIGN KEY (`userid`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `vote` ADD CONSTRAINT `FK_f0861d36213da1a5c6a68ca3fef` FOREIGN KEY (`postid`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `post` ADD CONSTRAINT `FK_c9a65a5c8a51ceaa19e4b1a5352` FOREIGN KEY (`userid`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `comment_vote` ADD CONSTRAINT `FK_824e78ab993c230e64a4001478b` FOREIGN KEY (`userid`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `comment_vote` ADD CONSTRAINT `FK_5fe871f153624e152f2dd3de12b` FOREIGN KEY (`commentid`) REFERENCES `comment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_d6139c3f5f3069f0269e1e48f69` FOREIGN KEY (`userid`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_e44f582604d79b2dc5af7a9d9c7` FOREIGN KEY (`postid`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_e44f582604d79b2dc5af7a9d9c7`", undefined);
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_d6139c3f5f3069f0269e1e48f69`", undefined);
        await queryRunner.query("ALTER TABLE `comment_vote` DROP FOREIGN KEY `FK_5fe871f153624e152f2dd3de12b`", undefined);
        await queryRunner.query("ALTER TABLE `comment_vote` DROP FOREIGN KEY `FK_824e78ab993c230e64a4001478b`", undefined);
        await queryRunner.query("ALTER TABLE `post` DROP FOREIGN KEY `FK_c9a65a5c8a51ceaa19e4b1a5352`", undefined);
        await queryRunner.query("ALTER TABLE `vote` DROP FOREIGN KEY `FK_f0861d36213da1a5c6a68ca3fef`", undefined);
        await queryRunner.query("ALTER TABLE `vote` DROP FOREIGN KEY `FK_d9a709c32985e9a425b67b0974f`", undefined);
        await queryRunner.query("ALTER TABLE `Galahad`.`comment_vote` ADD CONSTRAINT `FK_5fe871f153624e152f2dd3de12b` FOREIGN KEY (`commentid`) REFERENCES `comment`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `Galahad`.`vote` ADD CONSTRAINT `FK_d9a709c32985e9a425b67b0974f` FOREIGN KEY (`userid`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `Galahad`.`post` ADD CONSTRAINT `FK_c9a65a5c8a51ceaa19e4b1a5352` FOREIGN KEY (`userid`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `Galahad`.`comment_vote` ADD CONSTRAINT `FK_824e78ab993c230e64a4001478b` FOREIGN KEY (`userid`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `Galahad`.`comment` ADD CONSTRAINT `FK_d6139c3f5f3069f0269e1e48f69` FOREIGN KEY (`userid`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `Galahad`.`vote` ADD CONSTRAINT `FK_f0861d36213da1a5c6a68ca3fef` FOREIGN KEY (`postid`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `Galahad`.`comment` ADD CONSTRAINT `FK_e44f582604d79b2dc5af7a9d9c7` FOREIGN KEY (`postid`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("DROP TABLE `comment`", undefined);
        await queryRunner.query("DROP TABLE `comment_vote`", undefined);
        await queryRunner.query("DROP TABLE `user`", undefined);
        await queryRunner.query("DROP TABLE `post`", undefined);
        await queryRunner.query("DROP TABLE `vote`", undefined);
    }

}
