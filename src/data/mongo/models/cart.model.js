import { Schema, Types, model } from "mongoose";

const collection = "carts"
const schema = new Schema ({
    user_id: { type: Types.ObjectId, required: true, ref: 'users' },
    product_id: { type: Types.ObjectId, required: true, ref: 'products' },
    quantity: { type: Number, required: true },
    state: { type: String, required: true },
},{
    timestamps: true
})
 
schema.pre('find', function() {
  this.populate('user_id', 'email name -_id')
     .populate('product_id', 'name price -_id');
});

const Cart = model(collection, schema)
export default Cart