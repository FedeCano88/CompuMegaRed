// src/app.js
import express from 'express';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 8080;

// Middleware para JSON
app.use(express.json());

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Servidor escuchando
app.listen(PORT, () => {
  console.log(`Servidor CompuMegaRed escuchando en http://localhost:${PORT}`);
});
