import * as userModel from '../models/userModel.js';

export const getUsers = async () => {
  const users = await userModel.getUsers();
  return users;
};