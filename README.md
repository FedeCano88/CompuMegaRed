# 🖥️ CompuMegaRed - API de Productos y Carritos

Este proyecto fue desarrollado como parte de la **Primera Entrega** del curso **Programación Backend I - Coderhouse**.

Es una API que permite gestionar productos y carritos de una tienda ficticia llamada **CompuMegaRed**, especializada en accesorios de computación gamer.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
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
│   │   └── carts.routes.js
│   ├── managers/
│   │   ├── ProductManager.js
│   │   └── CartManager.js
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

## 📂 Datos cargados

- El archivo `products.json` incluye productos gamer de ejemplo.
- `carts.json` inicia vacío y se va completando desde Postman.

---

## 👋 Autor

**Federico Cano**  
Estudiante de Coderhouse  
Curso: Programación Backend I  
Entrega 1

---
