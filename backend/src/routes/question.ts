import express, { type Express, type Request, type Response } from 'express';
import * as questionController from '../controllers/questionController.js';
import * as authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware.authentication);
router.get('/:id', questionController.getQuestion);

export default router;