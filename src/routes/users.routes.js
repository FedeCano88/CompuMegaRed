// src/routes/users.routes.js
import { Router } from "express";
import userModel from "../models/user.model.js";
import { CartModel } from "../models/cart.model.js"; // ✅ Nuevo import

const router = Router();

// Ruta para registrar usuario
router.post("/", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  console.log("📦 Body recibido:", req.body);

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ detail: "Todos los campos son obligatorios" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ detail: "El correo ya está registrado" });
    }

    const user = await userModel.create({ first_name, last_name, email, password });

    // ✅ Crear carrito automáticamente
    await CartModel.create({ userId: user._id, products: [] });

    res.status(201).json({
      message: "Usuario registrado correctamente",
      user
    });

  } catch (error) {
    console.error("❌ Error al registrar usuario:", error);
    res.status(500).json({ detail: "Error interno del servidor" });
  }
});

// ✅ Ruta para iniciar sesión
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("🔐 Intento de login:", email);

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son obligatorios" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Éxito
    res.json({
      message: "Login exitoso",
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      }
    });
  } catch (err) {
    console.error("❌ Error al intentar loguear:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// ✅ Ruta para obtener todos los usuarios (con sus IDs)
router.get("/", async (req, res) => {
  try {
    const users = await userModel.find({}, "_id first_name last_name email");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;


