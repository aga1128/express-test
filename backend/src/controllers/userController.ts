import { type Request, type Response } from 'express';
import * as userService from '../services/userService.js';

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  if(!users) {
    return res.status(404).json({ message: "User is not found" })
  }
  res.status(200).json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const user = await userService.getUser(id);
  res.status(200).json(user);
};
