import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  code: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  status: { type: Boolean, default: true },
  stock: { type: Number, required: true },
  category: String,
  thumbnails: [String],
  brand: String,
  createdAt: { type: Date, default: Date.now }
});

// 👉 Activar el plugin de paginación
productSchema.plugin(mongoosePaginate);

export const ProductModel = mongoose.model('Product', productSchema);
