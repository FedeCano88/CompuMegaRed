// src/managers/ProductManager.js
import fs from 'fs/promises';
import path from 'path';

const filePath = path.resolve('src/data/products.json');

class ProductManager {
  constructor() {
    this.path = filePath;
  }

  async getProducts() {
    const data = await fs.readFile(this.path, 'utf-8');
    return JSON.parse(data);
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find(p => p.id === id);
  }

  async addProduct(product) {
    const products = await this.getProducts();
    const newId = products.length ? products[products.length - 1].id + 1 : 1;

    const newProduct = {
      id: newId,
      title: product.title,
      description: product.description,
      code: product.code,
      price: product.price,
      status: product.status ?? true,
      stock: product.stock,
      category: product.category,
      thumbnails: product.thumbnails ? [product.thumbnails] : [],
      brand: 'CompuMegaRed',
      createdAt: new Date().toISOString().split('T')[0]
    };

    products.push(newProduct);
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    return newProduct;
  }

  async updateProduct(id, updatedFields) {
    const products = await this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return { error: 'Producto no encontrado' };

    products[index] = { ...products[index], ...updatedFields, id }; // no se cambia el ID
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    return products[index];
  }

  async deleteProduct(id) {
    let products = await this.getProducts();
    const product = products.find(p => p.id === id);
    if (!product) return { error: 'Producto no encontrado' };

    products = products.filter(p => p.id !== id);
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    return { message: 'Producto eliminado' };
  }
}

export default ProductManager;
