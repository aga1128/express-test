import { type Request, type Response } from 'express';
import * as questionService from '../services/questionService.js';

export const getQuestion = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const user = await questionService.getUser(id);
  res.status(200).json(user);
};