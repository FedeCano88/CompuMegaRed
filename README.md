# 🖥️ CompuMegaRed - Tienda Online con Backend Profesional

Este proyecto fue desarrollado como parte de la **Entrega Final** del curso **Programación Backend - Coderhouse**.

Se trata de una aplicación backend completa que permite gestionar productos y carritos con persistencia en **MongoDB**, renderizado de vistas con **Handlebars**, y comunicación en tiempo real mediante **Socket.IO**.

Incluye filtros avanzados, paginación, ordenamientos por precio, vistas dinámicas de productos y carritos, y simulación de compra.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.IO (WebSockets)
- Express-Handlebars
- JavaScript ES Modules
- SweetAlert2 (alertas visuales)
- Bootstrap (estética visual)
- Postman (para testing de endpoints)

---

## 📁 Estructura del proyecto

```
CompuMegaRed/
├── src/
│   ├── app.js
│   ├── routes/
│   │   ├── products.routes.js
│   │   ├── carts.routes.js
│   │   ├── users.routes.js
│   │   └── views.routes.js
│   ├── models/
│   │   ├── product.model.js
│   │   ├── cart.model.js
│   │   └── user.model.js
│   ├── managers/
│   │   ├── ProductManager.js
│   │   └── CartManager.js
│   ├── views/
│   │   ├── products.handlebars
│   │   ├── productDetail.handlebars
│   │   ├── cartDetail.handlebars
│   │   └── realtime.handlebars
│   ├── public/
│   │   └── js/
│   │       └── main.js
│   └── config/
│       └── db.js
├── package.json
└── README.md
```

---

## ⚙️ Instalación y ejecución

1. Clonar el repositorio:
```bash
git clone https://github.com/FedeCano88/CompuMegaRed
cd CompuMegaRed
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar archivo `.env` (si aplica, para la conexión a MongoDB)

4. Iniciar el servidor:
```bash
npm run start
```

Servidor local:
📍 `http://localhost:8080`

---

## 📦 Endpoints disponibles

### 🔹 Productos `/api/products`

| Método | Ruta                        | Descripción                                                   |
|--------|-----------------------------|---------------------------------------------------------------|
| GET    | `/api/products`             | Listado con filtros, paginación y ordenamiento (`query`, `limit`, `page`, `sort`) |
| GET    | `/api/products/:pid`        | Obtener un producto por ID                                    |
| POST   | `/api/products`             | Crear un nuevo producto                                       |
| PUT    | `/api/products/:pid`        | Actualizar un producto                                        |
| DELETE | `/api/products/:pid`        | Eliminar un producto                                          |

### 🔹 Carritos `/api/carts`

| Método | Ruta                                        | Descripción                                                   |
|--------|---------------------------------------------|---------------------------------------------------------------|
| POST   | `/api/carts`                                | Crear nuevo carrito                                           |
| GET    | `/api/carts/:cid`                           | Obtener productos del carrito con populate                    |
| POST   | `/api/carts/:cid/product/:pid`              | Agregar un producto al carrito                               |
| DELETE | `/api/carts/:cid/products/:pid`             | Eliminar un producto específico del carrito                   |
| PUT    | `/api/carts/:cid`                           | Actualizar carrito completo con un arreglo de productos       |
| PUT    | `/api/carts/:cid/products/:pid`             | Actualizar cantidad de un producto específico                 |
| DELETE | `/api/carts/:cid`                           | Eliminar todos los productos del carrito                      |

---

## 📊 Respuesta paginada de `/api/products`

Formato esperado:
```json
{
  "status": "success",
  "payload": [...productos],
  "totalPages": 5,
  "prevPage": 1,
  "nextPage": 3,
  "page": 2,
  "hasPrevPage": true,
  "hasNextPage": true,
  "prevLink": "...",
  "nextLink": "..."
}
```

---

## 🖼️ Vistas disponibles

- `/products`:  
  Vista principal con productos paginados, filtrables y ordenables.

- `/products/:pid`:  
  Detalle de producto con botón para agregar al carrito.

- `/carts/:cid`:  
  Detalle de carrito con todos los productos y cantidades agregadas.

- `/realtimeproducts`:  
  Vista de administración en tiempo real (WebSockets) para agregar y eliminar productos.  

---

## 🔁 Funcionalidad en tiempo real

- Socket.IO utilizado para emitir eventos cuando se agrega o elimina un producto.
- La vista se actualiza automáticamente sin recargar la página.

---

## 🧠 Base de datos

- Se utiliza **MongoDB Atlas o local** como persistencia principal.
- Los carritos referencian productos por ID y se utiliza `.populate()` para mostrar sus datos completos.

---

## 📹 Video explicativo

[Video de entrega final](https://drive.google.com/file/d/1nQUXoZ7Oq0uGukaE13PL-E6dM77KjwNv/view?usp=sharing)

---

## 👨‍💻 Autor

**Federico Cano**  
Estudiante de Coderhouse  
Entrega Final - Backend

---