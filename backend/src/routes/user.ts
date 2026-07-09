import express, { type Express, type Request, type Response } from 'express';
import * as userController from '../controllers/userController.js';
import * as authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware.authentication);
router.get('/', userController.getUsers);
router.get('/info', userController.getUserInfo)

export default router;