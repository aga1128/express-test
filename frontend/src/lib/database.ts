import initSqlJs, { type Database } from "sql.js";

export async function createDatabase(setupSql: string): Promise<Database> {
const SQL = await initSqlJs({
  locateFile: (file) => {
    return `/sqljs/${file}`;
  },
});

  let db;

  db = new SQL.Database();

  db.run(setupSql);

  return db;
}