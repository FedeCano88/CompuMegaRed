import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // 🔐 un solo carrito por usuario
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ]
});

export const CartModel = mongoose.model('Cart', cartSchema);
