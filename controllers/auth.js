import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

export const generateToken = user => {
    return jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET_KEY, 
        { expiresIn: '3d' }
    )
}

export const signup = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { username, email, password } = req.body
    try{
    let existingUser;
    existingUser = await User.findOne({email});
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    if(existingUser){
        return res.status(404).json({success: false, message: 'User with this email already exists'})
    }
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })

    const savedUser = await newUser.save();
    return res.status(201).json({success: true, message:'User signedup successfully', data: savedUser})
    }catch(err){
        return res.status(201).json({success: false, message:'User signup failed'})
    }
}

export const login = async (req, res) => {
    const { email } = req.body;

    try{
        let existingUser;
        existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(404).json({success: false, message: 'No user with this email found'});
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, existingUser.password);
        if(!isPasswordMatch){
            return res.status(400).json({success: false, message: 'password entered is incorrect'});
        }

        const token = generateToken(existingUser);
        const { password, ...rest } = existingUser._doc

        return res.status(200).json({success:true, message:'login successful', token, data: {...rest}});
    }catch(err){
        return res.status(500).json({err: console.log(err), success:false, message:'Internal server error'});
    }
}