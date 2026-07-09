import { type Request, type Response } from 'express';
import * as userService from '../services/userService.js';

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.findAll();
  if(!users) {
    return res.status(404).json({ message: "User is not found" })
  }
  res.json({ message: 'ユーザーです。' });
};

export const getUserInfo = async (req: Request, res: Response) => {
  res.send('ユーザー情報です。');
};
