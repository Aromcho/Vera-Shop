import {  Router } from "express";
import express from "express"
import path from "path";
import productRouter from "./product.view.js";
import usersRouter from "./user.view.js";
import productManager from "../../data/fs/ProductManager.fs.js";
import cartManager from "../../data/fs/CartManager.fs.js";
import cartRouter from "./cart.view.js";

import __dirname from "../../../utils.js";

const viewsRouter = Router();

// Sirve archivos estáticos desde la carpeta 'public'
viewsRouter.use(express.static(path.join(__dirname, 'public')));

viewsRouter.use("/products", productRouter);
viewsRouter.use("/users", usersRouter);
viewsRouter.use("/cart", cartRouter);

viewsRouter.get("/home", async (req, res, next) => {
    try {
        const { category } = req.query;
        const products = await productManager.read(category);
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } catch (error) {
        return next(error);
    }
});

viewsRouter.post("/add-to-cart/:id", async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await productManager.readOne(productId);
        await cartManager.create({
            product_id: productId,
            product: product,
            quantity: 1,
        });
        res.sendStatus(200);
    } catch (error) {
        return next(error);
    }
});

viewsRouter.get("/cart", async (req, res, next) => {
    try {
        const cartItems = await cartManager.read();
        res.sendFile(path.join(__dirname, 'public', 'cart.html')); // Asegúrate de tener un archivo cart.html en tu carpeta public
    } catch (error) {
        return next(error);
    }
});

export default viewsRouter;
