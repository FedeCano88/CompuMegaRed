// src/routes/views.routes.js

import { Router } from 'express';
import { ProductModel } from '../models/product.model.js';
import { CartModel } from '../models/cart.model.js';
import userModel from '../models/user.model.js';

const router = Router();

// Página principal - Home
router.get('/', async (req, res) => {
  try {
    const products = await ProductModel.find().lean();
    res.render('home', { products });
  } catch (error) {
    console.error("❌ Error cargando home:", error);
    res.status(500).send('Error al cargar productos desde MongoDB');
  }
});

// Vista en tiempo real
router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await ProductModel.find().lean();
    res.render('realTimeProducts', { products });
  } catch (error) {
    console.error("❌ Error realtime:", error);
    res.status(500).send('Error al cargar productos en tiempo real');
  }
});

// Tienda - SHOP
router.get('/shop', async (req, res) => {
  try {
    const products = await ProductModel.find().lean();

    const email = req.query.email;
    let cartId = null;

    if (email) {
      const user = await userModel.findOne({ email });
      if (user) {
        let cart = await CartModel.findOne({ userId: user._id });

        // ✅ Crear carrito si no existe
        if (!cart) {
          cart = await CartModel.create({
            userId: user._id,
            products: []
          });
        }

        cartId = cart._id.toString(); // 🔑 esto es lo que llega a Handlebars
      }
    }

    res.render('shop', {
      products,
      cartId // ahora llega bien a {{cartId}} en shop.handlebars
    });

  } catch (error) {
    console.error("❌ Error al cargar tienda:", error);
    res.status(500).send('Error al cargar productos en la tienda');
  }
});

// Login
router.get('/login', (req, res) => {
  res.render('login', { title: 'Iniciar Sesión' });
});

// Registro
router.get('/register', (req, res) => {
  res.render('register', { title: 'Registro' });
});

// Perfil
router.get('/profile', (req, res) => {
  res.render('profile', { title: 'Perfil' });
});

// Exportar router
export default router;





