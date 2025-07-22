// models/purchase.model.js
import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  products: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  total: Number,
  paymentMethod: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const purchaseModel = mongoose.model("purchases", purchaseSchema);
export default purchaseModel;
