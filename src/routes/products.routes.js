// src/routes/products.routes.js
import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager();

router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, query, sort } = req.query;
    const allProducts = await productManager.getProducts();

    // Filtro por query
    let filteredProducts = allProducts;
    if (query) {
      filteredProducts = allProducts.filter(p =>
        p.category?.toLowerCase().includes(query.toLowerCase()) ||
        (query === 'disponible' && p.status === true) ||
        (query === 'no-disponible' && p.status === false)
      );
    }

    // Ordenamiento
    if (sort === 'asc') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'desc') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredProducts.length / limit);
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;

    const createLink = (p) => `/api/products?limit=${limit}&page=${p}&query=${query || ''}&sort=${sort || ''}`;


    res.json({
      status: 'success',
      payload: paginatedProducts,
      totalPages,
      prevPage: hasPrevPage ? parseInt(page) - 1 : null,
      nextPage: hasNextPage ? parseInt(page) + 1 : null,
      page: parseInt(page),
      hasPrevPage,
      hasNextPage,
      prevLink: hasPrevPage ? createLink(page - 1) : null,
      nextLink: hasNextPage ? createLink(page + 1) : null
    });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

router.get('/:pid', async (req, res) => {
  const product = await productManager.getProductById(req.params.pid);
  product
    ? res.json({ payload: product }) // ✅ IMPORTANTE: devolvemos el producto bajo "payload"
    : res.status(404).json({ error: 'Producto no encontrado' });
});

router.post('/', async (req, res) => {
  console.log('Datos recibidos en POST:', req.body);
  const result = await productManager.addProduct(req.body);
  res.status(201).json(result);
});

router.put('/:pid', async (req, res) => {
  const result = await productManager.updateProduct(req.params.pid, req.body);
  res.json(result);
});

router.delete('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const result = await productManager.deleteProduct(pid);
    if (!result) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }
    res.json({ status: 'success', message: 'Producto eliminado', data: result });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al eliminar producto', error });
  }
});



export default router;
