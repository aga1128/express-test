import * as questionModel from '../models/questionModel.js';

export const getUser = async(id: number) => {
  const user = await questionModel.getQuestion(id);
  return user;
}