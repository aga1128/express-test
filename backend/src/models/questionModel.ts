import { executeQuery } from '../db/db.js';

export const getQuestion = async(id: number) => {
  const result = await executeQuery(
    "SELECT * FROM questions WHERE id = $1",
    [id]
  )
  return result.rows[0];
}