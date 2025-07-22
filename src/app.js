
import express from 'express';
import handlebars from 'express-handlebars';
import { Server as SocketIOServer } from 'socket.io';
import { createServer } from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Routers
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import viewsRouter from './routes/views.routes.js';
import purchasesRouter from './routes/purchases.routes.js';
import usersRouter from './routes/users.routes.js';

// Managers
import ProductManager from './managers/ProductManager.js';
const productManager = new ProductManager();

// Configuración general
dotenv.config();
const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer);

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) throw new Error('❌ Falta definir MONGO_URI en el archivo .env');

// Conexión a MongoDB
mongoose.connect(MONGO_URI, {
  dbName: process.env.MONGO_DB_NAME || 'ProyectoCoder',
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Mongoose conectado a MongoDB Atlas'))
.catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Configuración handlebars
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/purchases', purchasesRouter);
app.use('/api/users', usersRouter);
app.use('/', viewsRouter);

// WebSocket
io.on('connection', async socket => {
  console.log('🔌 Nuevo cliente conectado por socket.io');

  socket.emit('products-updated', await productManager.getProducts());

  socket.on('new-product', async (data) => {
    await productManager.addProduct(data);
    const productos = await productManager.getProducts();
    io.emit('products-updated', productos);
  });

  socket.on('delete-product', async (id) => {
    await productManager.deleteProduct(id);
    const productos = await productManager.getProducts();
    io.emit('products-updated', productos);
  });
});

// Inicio del servidor
httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
