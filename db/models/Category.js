import { Schema, model } from 'mongoose';

const SchemaTypes = Schema.Types;

const categorySchema = new Schema({
  _id: SchemaTypes.ObjectId,
  value: String,
});

const Category = model('Category', categorySchema, 'categories');
export default Category;
