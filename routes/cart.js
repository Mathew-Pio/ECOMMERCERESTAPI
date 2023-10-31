import express from 'express';
import { authorization } from '../auth/verifyToken.js';
import { createCart, updateCart, deleteCart, getCart, getAllCarts } from '../controllers/cart.js';
const router = express.Router();

router.post('/', authorization, createCart);

router.put('/:id', authorization, updateCart);

router.delete('/:id', authorization, deleteCart);

router.get('/:id', authorization , getCart);

router.get('/', authorization , getAllCarts);

export default router;