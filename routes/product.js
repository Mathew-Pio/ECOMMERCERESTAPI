import express from 'express';
import { isAdmin } from '../auth/verifyToken.js';
import { createProduct, updateProduct, deleteProduct, getProduct, getAllProducts } from '../controllers/product.js';
const router = express.Router();

router.post('/', isAdmin, createProduct);

router.put('/:id', isAdmin, updateProduct);

router.delete('/:id', isAdmin, deleteProduct);

router.get('/:id', getProduct);

router.get('/', getAllProducts);

export default router;