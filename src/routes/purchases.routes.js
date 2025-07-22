// src/routes/purchases.routes.js
import { Router } from 'express';
import purchaseModel from '../models/purchase.model.js';
import userModel from '../models/user.model.js';

const router = Router();

router.get('/:email', async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const compras = await purchaseModel.find({ userId: user._id }).sort({ createdAt: -1 });

    res.json(compras);
  } catch (err) {
    console.error("❌ Error al obtener compras:", err);
    res.status(500).json({ error: "Error al obtener historial" });
  }
});

router.post('/', async (req, res) => {
  try {
    const { email, items, total, method } = req.body;

    if (!email || !items || !total || !method) {
      return res.status(400).json({ error: 'Faltan datos en la compra' });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const newPurchase = await purchaseModel.create({
      userId: user._id,
      products: items.map(p => ({
        name: p.title,
        price: p.price,
        quantity: p.quantity
      })),
      total: parseFloat(total),
      paymentMethod: method
    });

    res.status(201).json({ message: 'Compra registrada con éxito', id: newPurchase._id });

  } catch (err) {
    console.error('❌ Error al registrar la compra:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

export default router;

