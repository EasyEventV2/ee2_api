import { Schema, model } from 'mongoose';

const SchemaTypes = Schema.Types;

const roleSchema = new Schema({
  _id: SchemaTypes.ObjectId,
  permissions: [{
    type: SchemaTypes.ObjectId,
    ref: 'Permission',
  }],
  name: String,
  type: String,
});

const Role = model('Role', roleSchema, 'roles');
export default Role;
