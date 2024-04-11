import { Router } from "express";
import productManager from "../../data/fs/ProductManager.fs.js";

 const productRouter = Router();

 productRouter.get("/", async (req,res,next)=>{
    try {
        const products = await productManager.read()
        return res.render("products", { products })
    } catch (error) {
        return next(error)
    }

})
  
export default productRouter