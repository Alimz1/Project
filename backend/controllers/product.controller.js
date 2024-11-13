import mongoose from 'mongoose';
import Product from '../models/product.js'; 



export const getProducts = async (req, res) => {
    try {
        let products = await Product.find({})
        res.send(products)
    } catch (error) {
        console.error("error in fetching products:",error.message)
        res.status(500).json({success:false,message:"Server Error"})
        
    }
}
export const createProduct = async(req,res)=>{
    let {name,price,image} = req.body
    if (!name || !price || !image) return res.status(400).json({success:false,message:"Please Provide all fields!"})
    try {
        let newProduct = await Product.create({
            name,
            price,
            image
        })
        res.send(newProduct)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({success:false,message:"Server Error"})
    }
}
export const editProduct = async (req,res)=>{
    const {id} = req.params
    let {name,price,image} = req.body
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success:false,message:"Invalid Id"})
    }
    try {
        let updatedProduct = await Product.findByIdAndUpdate(id,{
            name,
            price,
            image
        },
        {new:true})
        res.send(updatedProduct)
    } catch (error) {
        console.error("error in updating products:",error.message)
        res.status(404).json({success:false,message:"Product not found"})
    }
}
export const deleteProduct = async (req,res)=>{
    const {id} = req.params
    try {
        await Product.findByIdAndDelete(id)
        res.send("product deleted successfully")
    } catch (error) {
        console.error("error in deleting products:",error.message)
        res.status(404).json({success:false,message:"Product not found"})
    }
}