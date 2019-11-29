import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  value: String,
});

const Category = model('Category', categorySchema, 'categories');
export default Category;
