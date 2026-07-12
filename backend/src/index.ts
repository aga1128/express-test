import express, { type Express, type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import userRouter  from './routes/user.js';

const app: Express = express();
const PORT = 3000;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send("こんにちは");
});


//ルーティング
app.use('/users', userRouter);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});