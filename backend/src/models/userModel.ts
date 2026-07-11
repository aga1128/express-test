import { executeQuery } from '../db/db.js';

export const getUsers = async() => {
  const result = await executeQuery(
    "SELECT * FROM users"
  )
  return result.rows;
}