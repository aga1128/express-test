-- --------------------------------------------------------
-- ホスト:                          127.0.0.1
-- サーバーのバージョン:                   PostgreSQL 18.4 on x86_64-windows, compiled by msvc-19.44.35227, 64-bit
-- サーバー OS:                      
-- HeidiSQL バージョン:               12.20.0.7320
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES  */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS "questions";
DROP TABLE IF EXISTS "users";

CREATE TABLE IF NOT EXISTS "users" (
	"id" SERIAL NOT NULL,
	"username" VARCHAR(50) NULL DEFAULT NULL,
	"password" TEXT NULL DEFAULT NULL,
	"email" VARCHAR(255) NULL DEFAULT NULL,
	"created_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY ("id")
);

DELETE FROM "users";
INSERT INTO "users" ("id", "username", "password", "email", "created_at") VALUES
	(1, 'agawa', '1234', 't.agawa1128ht@gmail.com', '2026-07-11 18:40:17');

CREATE TABLE IF NOT EXISTS "questions" (
	"id" SERIAL NOT NULL,
	"title" VARCHAR(20) NOT NULL,
	"description" TEXT NOT NULL,
	"setup_sql" TEXT NOT NULL,
	"answer_sql" TEXT NOT NULL,
	"expected_result" JSONB NOT NULL,
	"hint" TEXT NULL DEFAULT NULL,
	"author_id" INTEGER NOT NULL,
	"created_at" TIMESTAMP NULL DEFAULT now(),
	"updated_at" TIMESTAMP NULL DEFAULT now(),
	PRIMARY KEY ("id"),
	CONSTRAINT "questions_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

DELETE FROM "questions";
INSERT INTO "questions" ("id", "title", "description", "setup_sql", "answer_sql", "expected_result", "hint", "author_id", "created_at", "updated_at") VALUES
	(1, 'SELECT文', 'usersのidとdepartmentテーブルのuser_idが一致するデータをすべて取得してください。', 'CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      name TEXT,
      department_id INTEGER,
      FOREIGN KEY(department_id) REFERENCES departments(id)
    );

    CREATE TABLE departments(
      id SERIAL PRIMARY KEY,
      name TEXT
    );

    INSERT INTO users VALUES
    (1, ''田中'', 1),
    (2, ''佐藤'', 3),
    (3, ''鈴木'', null);

    INSERT INTO departments VALUES
    (1, ''営業課''),
    (2, ''総務課''),
    (3, ''情報サービス課'');', 'SELECT * FROM users AS u
INNER JOIN departments AS d
ON u.department_id = d.id;', '{"values": [[1, "田中", 1, 1, "営業課"], [2, "佐藤", 3, 3, "情報サービス課"]], "columns": ["id", "name", "department_id", "id", "name"]}', NULL, 1, '2026-07-15 22:16:16.175425', '2026-07-15 22:16:16.175425');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;


COMMENT ON COLUMN questions.description IS '問題id';
COMMENT ON COLUMN questions.title IS '問題タイトル';
COMMENT ON COLUMN questions.description IS '問題文';
COMMENT ON COLUMN questions.setup_sql IS '問題表示用のSQL';
COMMENT ON COLUMN questions.answer_sql IS '解答SQL';
COMMENT ON COLUMN questions.expected_result IS '解答SQLの実行結果';
COMMENT ON COLUMN questions.hint IS '解答のヒント';
COMMENT ON COLUMN questions.author_id IS '作成者';
COMMENT ON COLUMN questions.created_at IS '問題作成日時';
COMMENT ON COLUMN questions.updated_at IS '問題更新日時';