// src/managers/ProductManager.js
import { ProductModel } from '../models/product.model.js';

class ProductManager {
  async getProducts() {
    return await ProductModel.find();
  }

  async getProductById(id) {
    return await ProductModel.findById(id);
  }

  async addProduct(product) {
    const newProduct = new ProductModel({
      title: product.title,
      description: product.description,
      code: product.code,
      price: product.price,
      status: product.status ?? true,
      stock: product.stock,
      category: product.category,
      thumbnails: product.thumbnails ? [product.thumbnails] : [],
      brand: 'CompuMegaRed'
    });

    return await newProduct.save();
  }

  async updateProduct(id, updatedFields) {
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, updatedFields, { new: true });
    if (!updatedProduct) return { error: 'Producto no encontrado' };
    return updatedProduct;
  }

  async deleteProduct(id) {
    const result = await ProductModel.findByIdAndDelete(id);
    if (!result) return { error: 'Producto no encontrado' };
    return { message: 'Producto eliminado' };
  }
}

export default ProductManager;

