export type UserType = {
  id: number,
  username: string,
  password: string,
  email: string,
  created_at: string;
}

export type QuestionType = {
  id: number,
  title: string,
  description: string,
  setup_sql: string,
  answer_sql: string,
  expected_result: { columns: string[], values: [][] },
  hint: string | null,
  author_id: number,
  created_at: Date,
  updated_at: Date | null
}