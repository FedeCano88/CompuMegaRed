// src/routes/products.routes.js
import { Router } from 'express';
import { ProductModel } from '../models/product.model.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, query, sort } = req.query;

    // Crear filtro dinámico
    const filter = {};
    if (query) {
      if (query === 'disponible') filter.status = true;
      else if (query === 'no-disponible') filter.status = false;
      else filter.category = { $regex: query, $options: 'i' };
    }

    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {},
    };

    const result = await ProductModel.paginate(filter, options);

    res.json({
      status: 'success',
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `/api/products?page=${result.prevPage}&limit=${limit}` : null,
      nextLink: result.hasNextPage ? `/api/products?page=${result.nextPage}&limit=${limit}` : null
    });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.pid);
    product
      ? res.json({ payload: product })
      : res.status(404).json({ error: 'Producto no encontrado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newProduct = await ProductModel.create(req.body);
    res.status(201).json({ status: 'success', payload: newProduct });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.pid, req.body, { new: true });
    res.json({ status: 'success', payload: updatedProduct });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    const result = await ProductModel.findByIdAndDelete(req.params.pid);
    if (!result) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }
    res.json({ status: 'success', message: 'Producto eliminado', data: result });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al eliminar producto', error });
  }
});

export default router;

