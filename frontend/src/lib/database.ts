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
      id INTEGER,
      name TEXT
    );

    INSERT INTO users VALUES
    (1,'田中'),
    (2,'佐藤');
  `);

  return db;
}