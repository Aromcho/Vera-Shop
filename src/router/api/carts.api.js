import { Router } from 'express';
import cartManager from '../../data/mongo/managers/CartManager.mongo.js';

const cartsRouter = Router();

cartsRouter.get('/', read);
cartsRouter.post('/', create);
cartsRouter.post('/add-to-cart/:pid', addToCart);
cartsRouter.put('/:id', update);
cartsRouter.delete('/:id', destroy);

async function read(req, res, next) {
    try {
        const cartItems = await cartManager.read();
        res.json(cartItems);
    } catch (error) {
        next(error);
    }
}

async function create(req, res, next) {
    try {
        const cartItemData = req.body;
        const newCartItem = await cartManager.create(cartItemData);
        res.status(201).json(newCartItem);
    } catch (error) {
        next(error);
    }
}

async function addToCart(req, res, next) {
    try {
        const productId = req.params.id;
        const user_id = "a69867dc9cfc7062dfd112e7"; // Reemplaza esto con el user_id real
        const cartItemData = {
            user_id: user_id,
            product_id: productId,
            quantity: 1, // Puedes ajustar la cantidad según la solicitud
            state: "reserved" // Estado predeterminado: "reserved"
        };
        const newCartItem = await cartManager.create(cartItemData);
        res.status(201).json(newCartItem);
    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    try {
        const { id } = req.params;
        const newData = req.body;
        const updatedCartItem = await cartManager.update(id, newData);
        res.status(200).json(updatedCartItem);
    } catch (error) {
        next(error);
    }
}

async function destroy(req, res, next) {
    try {
        const { id } = req.params;
        const deletedCartItem = await cartManager.destroy(id);
        res.status(200).json(deletedCartItem);
    } catch (error) {
        next(error);
    }
}

export default cartsRouter;
