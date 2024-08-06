import { model, Schema, Types } from "mongoose";

const collection = "orders";
const schema = new Schema({
    user_id: { type: Types.ObjectId, required: true, ref: "users", index: true },
    quantity: { type: Number, default: 1 },
    address: { type: String, required: true },
    paymentMethod: { type: String, required: true, enum: ["credit", "debit", "cash", "mercadopago"] },
    deliveryMethod: { type: String, required: true, enum: ["home", "store"] },
    storePaymentOption: { type: String, required: false, enum: ["online", "store"] },
    state: { type: String, default: "reserver", enum: ["reserver", "payed", "delivered"], index: true },
    ticket: { type: Number, required: true },
}, {
    timestamps: true
});

schema.pre('find', function() {
    this.populate('user_id', "email name -_id");
});
schema.pre('findOne', function() { this.populate('user_id', 'email'); });

const Order = model(collection, schema);
export default Order;
