// src/script/importProducts.js
import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { ProductModel } from '../models/product.model.js';

// 🔐 Tu conexión (podés quitarla luego o pasarla a .env)
const MONGO_URI = 'mongodb+srv://fedecano1988:q6C4X4H8a8UYJgbg@cluster0.5ge3v.mongodb.net/ProyectoCoder?retryWrites=true&w=majority';

// Utilidades para rutas (porque estamos en ESModules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta del JSON con tus productos
const filePath = path.resolve(__dirname, '../data/products.json');

async function importProducts() {
  try {
    console.log('📦 Conectando a MongoDB...');
    await mongoose.connect(MONGO_URI);

    console.log('📄 Leyendo products.json...');
    const raw = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(raw);

    if (!Array.isArray(data)) {
      throw new Error('El archivo products.json debe contener un array de productos');
    }

    // Opcional: limpiar colección antes
    // await ProductModel.deleteMany({});

    const result = await ProductModel.insertMany(data);
    console.log(`✅ Se cargaron ${result.length} productos correctamente`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al cargar productos:', error.message);
    process.exit(1);
  }
}

importProducts();

