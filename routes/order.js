import express from 'express';
import { authorization } from '../auth/verifyToken.js';
import { createOrder, updateOrder, deleteOrder, getOrder, getAllOrders } from '../controllers/order.js';
const router = express.Router();

router.post('/', authorization, createOrder);

router.put('/:id', authorization, updateOrder);

router.delete('/:id', authorization, deleteOrder);

router.get('/:id', authorization , getOrder);

router.get('/', authorization , getAllOrders);

export default router;