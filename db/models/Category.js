const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = Schema.Types;

const categorySchema = new Schema({
    _id: SchemaTypes.ObjectId,
    value: String
})

const Category = mongoose.model('Category', categorySchema, 'categories');
module.exports = Category;