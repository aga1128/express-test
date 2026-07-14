import initSqlJs from "sql.js";

let db: any;

export async function createDatabase() {
const SQL = await initSqlJs({
  locateFile: (file) => {
    return `/sqljs/${file}`;
  },
});

  db = new SQL.Database();

  db.run(`
    CREATE TABLE users(
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
    (1, '田中', 1),
    (2, '佐藤', 3),
    (3, '鈴木', null);

    INSERT INTO departments VALUES
    (1, '営業課'),
    (2, '総務課'),
    (3, '情報サービス課');
  `);

  return db;
}