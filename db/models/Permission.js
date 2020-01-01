import { Schema, model } from 'mongoose';

const permissionSchema = new Schema({
  data: {
    target: String,
    scope: String,
    action: String,
  },
});

const Permission = model('Permission', permissionSchema, 'permissions');
export default Permission;
