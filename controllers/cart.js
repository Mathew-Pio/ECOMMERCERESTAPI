import Cart from '../models/Cart.js';

export const createCart = async (req, res) => {
    const newCart = new Cart(req.body);

    try{
        const savedCart = await newCart.save();
        return res.status(201).json({success: true, message:'New Cart created', data: savedCart});
    }catch(err){
        return res.status(500).json({success: false, message:'Failed to create Cart'})
    }
}

export const updateCart = async (req, res) => {
    const id = req.params.id;
    try{
    const updatedCart = await Cart.findByIdAndUpdate(id,
        {
         $set: req.body
        },
        { new: true }
    );
    await updatedCart.save();
    return res.status(200).json({success:true, message:'Cart updated successfully', data: updatedCart})
    }catch(err){
        return res.status(500).json({success: false, message:'Failed to update Cart'})
    }
}

export const deleteCart = async (req, res) => {
    const id = req.params.id;
    try{
        await Cart.findByIdAndDelete(id);
        return res.status(200).json({sucess: true, message:'Cart deleted successfully'})
    }catch(err){
        return res.status(500).json({success:false, message:'Cart failed to delete'})
    }
}

export const getCart = async (req, res) => {
    const id = req.params.id;
    try{
        const cart = await Cart.findById(id);
        return res.status(200).json({sucess: true, message:'Cart found', data: cart})
    }catch(err){
        return res.status(500).json({success:false, message:'Cart not found'})
    }
}

export const getAllCarts = async (req, res) => {
    try{
        const carts = await Cart.find();
        return res.status(200).json({sucess: true, message:'Cart found', data: carts})
    }catch(err){
        return res.status(500).json({success:false, message:'Cart not found'})
    }
}