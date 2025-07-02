// src/routes/products.routes.js
import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager();

router.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

router.get('/:pid', async (req, res) => {
  const product = await productManager.getProductById(Number(req.params.pid));
  product ? res.json(product) : res.status(404).json({ error: 'Producto no encontrado' });
});

router.post('/', async (req, res) => {
  console.log('Datos recibidos en POST:', req.body);
  const result = await productManager.addProduct(req.body);
  res.status(201).json(result);
});

router.put('/:pid', async (req, res) => {
  const result = await productManager.updateProduct(Number(req.params.pid), req.body);
  res.json(result);
});

router.delete('/:pid', async (req, res) => {
  const result = await productManager.deleteProduct(Number(req.params.pid));
  res.json(result);
});

export default router;
