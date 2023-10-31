import Product from '../models/Product.js';

export const createProduct = async (req, res) => {
    const newProduct = new Product(req.body);

    try{
        const savedProduct = await newProduct.save();
        return res.status(201).json({success: true, message:'New Product created', data: savedProduct});
    }catch(err){
        return res.status(500).json({success: false, message:'Failed to create product'})
    }
}

export const updateProduct = async (req, res) => {
    const id = req.params.id;
    try{
    const updatedProduct = await Product.findByIdAndUpdate(id,
        {
         $set: req.body
        },
        { new: true }
    );
    await updatedProduct.save();
    return res.status(200).json({success:true, message:'Product updated successfully', data: updatedProduct})
    }catch(err){
        return res.status(500).json({success: false, message:'Failed to update product'})
    }
}

export const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try{
        await Product.findByIdAndDelete(id);
        return res.status(200).json({sucess: true, message:'Product deleted successfully'})
    }catch(err){
        return res.status(500).json({success:false, message:'Product failed to delete'})
    }
}

export const getProduct = async (req, res) => {
    const id = req.params.id;
    try{
        const product = await Product.findById(id);
        return res.status(200).json({sucess: true, message:'Product found', data: product})
    }catch(err){
        return res.status(500).json({success:false, message:'Product not found'})
    }
}

export const getAllProducts = async (req, res) => {
    const categories = new RegExp(req.query.categories, 'i');
    const newDate = req.query.new;
    try{
        let products;
        const queryCriteria = {};
        if(req.query.categories){
            queryCriteria.categories = categories;
        }
        if(newDate){
            products = await Product.find().sort({ createdAt: -1 }).limit(10);
        }
        products = await Product.find(queryCriteria);
        return res.status(200).json({sucess: true, message:'product found', data: products})
    }catch(err){
        return res.status(500).json({success:false, message:'product not found'})
    }
}