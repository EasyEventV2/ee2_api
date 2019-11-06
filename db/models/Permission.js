import { Schema, model } from 'mongoose';

const SchemaTypes = Schema.Types;

const permissionSchema = new Schema({
  _id: SchemaTypes.ObjectId,
  data: {
    target: String,
    scope: String,
    action: String,
  },
});

const Permission = model('Permission', permissionSchema, 'permissions');
export default Permission;
