import mongoose from 'mongoose';
import { CartModel } from '../models/cart.model.js';
import { ProductModel } from '../models/product.model.js';

class CartManager {
  // Obtener todos los carritos con los productos populados
  async getCarts() {
    return await CartModel.find().populate('products.product');
  }

  // Obtener un carrito por su ID
  async getCartById(id) {
    return await CartModel.findById(id).populate('products.product');
  }

  // Crear un nuevo carrito vacío
async createCart(userId) {
  const newCart = new CartModel({ userId, products: [] });
  return await newCart.save();
}

  // Agregar un producto al carrito
  async addProductToCart(cartId, productId) {
    const cart = await CartModel.findById(cartId);
    if (!cart) throw new Error('Carrito no encontrado');

    // Asegurar que el productId sea un ObjectId válido
    const objectId = new mongoose.Types.ObjectId(productId);

    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ product: objectId, quantity: 1 });
    }

    return await cart.save();
  }

  // Eliminar un producto específico del carrito
  async removeProductFromCart(cartId, productId) {
    const cart = await CartModel.findById(cartId);
    if (!cart) throw new Error('Carrito no encontrado');

    cart.products = cart.products.filter(p => p.product.toString() !== productId);
    return await cart.save();
  }

  // Reemplazar todo el contenido del carrito con un nuevo arreglo de productos
  async updateCart(cartId, newProducts) {
    const cart = await CartModel.findById(cartId);
    if (!cart) throw new Error('Carrito no encontrado');

    cart.products = newProducts;
    return await cart.save();
  }

  // Cambiar la cantidad de un producto en el carrito
  async updateProductQuantity(cartId, productId, quantity) {
    const cart = await CartModel.findById(cartId);
    if (!cart) throw new Error('Carrito no encontrado');

    const product = cart.products.find(p => p.product.toString() === productId);
    if (product) {
      product.quantity = quantity;
    }

    return await cart.save();
  }

  // Vaciar el carrito completamente
  async clearCart(cartId) {
    const cart = await CartModel.findById(cartId);
    if (!cart) throw new Error('Carrito no encontrado');

    cart.products = [];
    return await cart.save();
  }
}

export default CartManager;

