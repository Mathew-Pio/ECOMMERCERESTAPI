import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const updateUser = async (req, res) => {
    const id = req.params.id;
    if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: req.body
        }, {new:true} )
        await updatedUser.save();
        return res.status(200).json({success:true, message:'Update successful'})
    }catch(err){
        return res.status(500).json({success:false, message:'Unable to update'})
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try{
        await User.findByIdAndDelete(id);
        return res.status(200).json({sucess: true, message:'User deleted successfully'})
    }catch(err){
        return res.status(500).json({success:false, message:'User failed to delete'})
    }
}

export const getUser = async (req, res) => {
    const id = req.params.id;
    try{
        const user = await User.findById(id);
        const { password, ...rest } = user._doc;
        return res.status(200).json({sucess: true, message:'User found', data: {...rest}})
    }catch(err){
        return res.status(500).json({success:false, message:'User not found'})
    }
}

export const getAllUser = async (req, res) => {
    try{
        const users = await User.find().select('-password');
        return res.status(200).json({sucess: true, message:'User found', data: users})
    }catch(err){
        return res.status(500).json({success:false, message:'User not found'})
    }
}


export const getStats = async (req, res) => {
    try{
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: '$createdAt' }
                },
            },
            { $group: {
                _id: '$month',
                total: { $sum: 1 },
            } }
        ])
        return res.status(200).json({success: true, message:'User stats found', data: data})
    }catch(err){
        return res.status(500).json({success:false, message:'User stats not found'})
    }
}