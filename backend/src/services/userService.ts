import * as userModel from '../models/userModel.js';

export const getUsers = async () => {
  const users = await userModel.getUsers();
  return users;
};

export const getUser = async(id: number) => {
  const user = await userModel.getUser(id);
  return user;
}