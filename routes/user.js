import express from 'express';
import { updateUser, deleteUser, getUser, getAllUser, getStats } from '../controllers/user.js';
import { authorization, isAdmin } from '../auth/verifyToken.js';
const router = express.Router();

router.put('/:id', authorization , updateUser);

router.delete('/:id', authorization, deleteUser);

router.get('/:id', isAdmin, getUser);

router.get('/', isAdmin, getAllUser);

router.get('/find/stats', isAdmin, getStats);

export default router;