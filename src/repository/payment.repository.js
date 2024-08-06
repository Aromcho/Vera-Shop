// logica de stripe
import cartsManager from "../data/mongo/managers/CartManager.mongo.js";
import Stripe from 'stripe';
import CheckoutProduct from "../data/dto/checkoutProduct.dto.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentRepository = async (user_id) => {
        try {
            let productsOnCarts = cartsManager.read({ user_id });
            console.log(productsOnCarts);
            productsOnCarts = productsOnCarts.map((product) => new CheckoutProduct(product));
            console.log(productsOnCarts);
            const line_items = productsOnCarts;
            const mode = "payment";
            const success_url = "http://localhost:8080/";
            const intent = await stripe.checkout.sessions.create({
            line_items,
            mode,
            success_url,
            });
            return intent;
        } catch (error) {
            throw error;
        }
}

export  {createPaymentRepository};
