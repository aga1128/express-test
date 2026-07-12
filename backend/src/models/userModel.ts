import { executeQuery } from '../db/db.js';

export const getUsers = async() => {
  const result = await executeQuery(
    "SELECT * FROM users"
  )
  return result.rows;
}

export const getUser = async(id: number) => {
  const result = await executeQuery(
    "SELECT * FROM users WHERE id = $1",
    [id]
  )
  return result.rows;
}