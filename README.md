# 🖥️ CompuMegaRed - API y Tienda Interactiva

Este proyecto fue desarrollado como parte de la **Segunda Entrega** del curso **Programación Backend I - Coderhouse**.

Es una aplicación que permite gestionar productos y carritos de una tienda ficticia llamada **CompuMegaRed**, especializada en accesorios de computación gamer.

Incluye un sistema de **actualización en tiempo real** usando WebSockets con Socket.io, vistas renderizadas con **Handlebars**, y una **tienda interactiva** con carrito para simular el flujo de compra.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- Socket.io
- Express-Handlebars
- File System (`fs/promises`)
- JavaScript ES Modules
- Postman (para pruebas)

---

## 📁 Estructura del proyecto

```
CompuMegaRed/
├── src/
│   ├── app.js
│   ├── routes/
│   │   ├── products.routes.js
│   │   ├── carts.routes.js
│   │   └── views.routes.js
│   ├── managers/
│   │   ├── ProductManager.js
│   │   └── CartManager.js
│   ├── views/
│   │   ├── home.handlebars
│   │   ├── realTimeProducts.handlebars
│   │   └── shop.handlebars
│   ├── public/
│   │   └── js/
│   │       └── realtime.js
│   └── data/
│       ├── products.json
│       └── carts.json
├── .gitignore
├── package.json
└── README.md
```

---

## 📦 Instalación y ejecución

1. Cloná el repositorio:
```bash
git clone https://github.com/FedeCano88/CompuMegaRed
cd CompuMegaRed
```

2. Instalá dependencias:
```bash
npm install
```

3. Iniciá el servidor:
```bash
node src/app.js
```

El servidor se ejecuta en:  
📍 `http://localhost:8080`

---

## 🔌 Endpoints disponibles

### Productos `/api/products`

| Método | Ruta                  | Descripción                              |
|--------|-----------------------|------------------------------------------|
| GET    | `/api/products`       | Listar todos los productos               |
| GET    | `/api/products/:pid`  | Obtener un producto por su ID            |
| POST   | `/api/products`       | Agregar un nuevo producto                |
| PUT    | `/api/products/:pid`  | Actualizar un producto existente         |
| DELETE | `/api/products/:pid`  | Eliminar un producto por su ID           |

---

### Carritos `/api/carts`

| Método | Ruta                                | Descripción                                 |
|--------|-------------------------------------|---------------------------------------------|
| POST   | `/api/carts`                        | Crear un nuevo carrito                      |
| GET    | `/api/carts/:cid`                   | Ver los productos de un carrito             |
| POST   | `/api/carts/:cid/product/:pid`      | Agregar producto al carrito (de a uno)      |

---

## 🖼️ Vistas disponibles

- **Home:**  
  📍 `http://localhost:8080/`  
  Muestra la lista de productos actuales renderizados con Handlebars.

- **Productos en Tiempo Real:**  
  📍 `http://localhost:8080/realtimeproducts`  
  Permite agregar y eliminar productos en tiempo real usando websockets. La lista se actualiza automáticamente.

- **Tienda:**  
  📍 `http://localhost:8080/shop`  
  Permite a los usuarios ver productos, agregarlos al carrito, ver el detalle con cantidad y subtotal, vaciar el carrito y simular la compra mostrando el total.

---

## 📂 Datos cargados

- El archivo `products.json` incluye productos gamer de ejemplo.
- `carts.json` inicia vacío y se completa al agregar productos desde la tienda o Postman.

---

## 👋 Autor

**Federico Cano**  
Estudiante de Coderhouse  
Curso: Programación Backend I  
Entrega 2

---
