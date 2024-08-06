import CustomRouter from "../CustomRouter.js";
import { createPayment } from "../../controller/payment.controller.js";

class PaymentRouter extends CustomRouter{
    init() {
        this.create("/", createPayment );
    }
}

export default new PaymentRouter().getRouter();
