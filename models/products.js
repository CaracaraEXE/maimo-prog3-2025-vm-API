import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String },
  image: { type: String },
  price: { type: Number },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
});

export default mongoose.model('Product', productSchema, 'Products');
