import { Router } from "express";
import productRouter from "./product.view.js";
import usersRouter from "../api/user.api.js";

const viewsRouter = Router();
  
viewsRouter.use("/product", productRouter);
viewsRouter.use("/users", usersRouter);
viewsRouter.get("/", (req,res,next)=>{
    try {
        return res.render("index", { title: "home"} )
    } catch (error) {
        return next(error)
    }
})


export default viewsRouter;
