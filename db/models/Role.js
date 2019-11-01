const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = Schema.Types;

const roleSchema = new Schema({
    id: SchemaTypes.ObjectId,
    permissions: [SchemaTypes.ObjectId],
    name: String,
    type: String
})

const Role = mongoose.model('Role', roleSchema, 'roles');
module.exports = Role;