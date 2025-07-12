import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import viewsRouter from './routes/views.routes.js';
import path from 'path';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars.engine());
app.set('views', path.resolve('src/views'));

app.use(express.static(path.resolve('src/public')));

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});

const io = new Server(httpServer);
app.set('io', io);


import ProductManager from './managers/ProductManager.js';
const productManager = new ProductManager();

io.on("connection", async (socket) => {
  console.log("🔌 Cliente conectado");

  // Enviar productos actuales
  socket.emit("productos", await productManager.getProducts());

  // Nuevo producto
  socket.on("new-product", async (producto) => {
    await productManager.addProduct(producto);
    const productosActualizados = await productManager.getProducts();
    io.emit("productos", productosActualizados);
  });

  // Eliminar producto
  socket.on("delete-product", async (id) => {
    await productManager.deleteProduct(id);
    const productosActualizados = await productManager.getProducts();
    io.emit("productos", productosActualizados);
  });
});
