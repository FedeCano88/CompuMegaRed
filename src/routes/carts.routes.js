// src/routes/carts.routes.js
import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const cartManager = new CartManager();

// ✅ Obtener todos los carritos
router.get('/', async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    res.json({ status: 'success', payload: carts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Crear carrito nuevo
router.post('/', async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: 'Se requiere userId para crear carrito' });

  try {
    const cart = await cartManager.createCart(userId);
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Obtener carrito por ID
router.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartManager.getCartById(cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const result = await cartManager.addProductToCart(req.params.cid, req.params.pid);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Eliminar un producto específico del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const result = await cartManager.removeProductFromCart(cid, pid);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Actualizar todo el carrito con nuevos productos
router.put('/:cid', async (req, res) => {
  const { cid } = req.params;
  const newProducts = req.body.products;
  try {
    const result = await cartManager.updateCart(cid, newProducts);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Actualizar cantidad de un producto
router.put('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    const result = await cartManager.updateProductQuantity(cid, pid, quantity);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Vaciar carrito completamente
router.delete('/:cid', async (req, res) => {
  const { cid } = req.params;
  try {
    const result = await cartManager.clearCart(cid);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
