import { model, Schema, Types } from "mongoose";

const collection = "orders";
const schema = new Schema({
    user_id: { type: Types.ObjectId, required: true, ref: "users" },
    event_id: [{ type: Types.ObjectId, required: true, ref: "events" }],
    quantity: { type: Number,default: 1 },
    state: { type: String, default: "reserver", enum: ["reserver", "payed", "delivered"]},
},{
    timestamps: true
});
const Order = model(collection, schema);
export default Order;