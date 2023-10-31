import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
    const { products, amount, address, status, } = req.body;  
    const userId = req.userId;
    const newOrder = new Order({
      userId,
      products,
      amount,
      address,
      status,
    });

    try{
        const savedOrder = await newOrder.save();
        return res.status(201).json({success: true, message:'New Order created', data: savedOrder});
    }catch(err){
        return res.status(500).json({success: false, message:'Failed to create Order'})
    }
}

export const updateOrder = async (req, res) => {
    const id = req.params.id;
    try{
    const updatedOrder = await Order.findByIdAndUpdate(id,
        {
         $set: req.body
        },
        { new: true }
    );
    await updatedOrder.save();
    return res.status(200).json({success:true, message:'Order updated successfully', data: updatedOrder})
    }catch(err){
        return res.status(500).json({success: false, message:'Failed to update Order'})
    }
}

export const deleteOrder = async (req, res) => {
    const id = req.params.id;
    try{
        await Order.findByIdAndDelete(id);
        return res.status(200).json({sucess: true, message:'Order deleted successfully'})
    }catch(err){
        return res.status(500).json({success:false, message:'Order failed to delete'})
    }
}

export const getOrder = async (req, res) => {
    const id = req.params.id;
    try{
        const order = await Order.findById(id);
        return res.status(200).json({sucess: true, message:'Order found', data: order})
    }catch(err){
        return res.status(500).json({success:false, message:'Order not found'})
    }
}

export const getAllOrders = async (req, res) => {
    try{
        const orders = await Order.find();
        return res.status(200).json({sucess: true, message:'Order found', data: orders})
    }catch(err){
        return res.status(500).json({success:false, message:'Order not found'})
    }
}

export const getIncome = async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try{
        const income = await Order.aggregate([
            { $match: {createdAt: { $gte: previousMonth } } },
            {
                $project: {
                month: { $month:"$createdAt" },
                sales: "$amount",
            },
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: "sales"}
                }
            },
        ]);
        return res.status(200).json({success:true, message:'found', data: income})
    }catch(err){
        return res.status(500).json({ success:false, message:'failed to get income' })
    }
}