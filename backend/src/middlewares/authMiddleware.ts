import express, { type Express, type Request, type Response, type NextFunction } from 'express';

//ミドルウェア

/**
 * @param req
 * @param res 
 * @param next 
 */
export const authentication = (req: Request, res: Response, next: NextFunction) => {
  //認証処理
  console.log(req.originalUrl);
  next();
}