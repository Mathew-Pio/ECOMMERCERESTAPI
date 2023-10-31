import express from 'express';
import { signup, login } from '../controllers/auth.js';
import { check } from 'express-validator';
const router = express.Router();

// signup
router.post('/signup', [
    check('email')
    .isEmail()
    .withMessage('please enter a valid email')
    .normalizeEmail(),
    check('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long')
] , signup)

router.post('/login', login)

export default router;