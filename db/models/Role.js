const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = Schema.Types;

const roleSchema = new Schema({
    _id: SchemaTypes.ObjectId,
    permissions: [{
        type: SchemaTypes.ObjectId,
        ref: 'Permission'
    }],
    name: String,
    type: String
})

const Role = mongoose.model('Role', roleSchema, 'roles');
module.exports = Role;