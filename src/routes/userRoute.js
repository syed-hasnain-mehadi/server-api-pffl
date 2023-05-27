import express from 'express';
import { getAllUsers, getUser } from '../controllers/userController.js';
import { auth } from '../middleware/headerValidation.js';

const router = express.Router();

router.get('/get-user', auth, getUser);
router.get('/get-all-users', auth, getAllUsers);

export default router;
