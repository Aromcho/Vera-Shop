import { Router } from "express";
import userRouter from "./user.api.js";
import productRouter from "./product.api.js";
import cartsRouter from "./carts.api.js"; // Importa el enrutador del carrito

const apiRouter = Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/product", productRouter);
apiRouter.use("/cart", cartsRouter); // Agrega el enrutador del carrito

export default apiRouter;
