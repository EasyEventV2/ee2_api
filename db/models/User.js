import { Schema, model } from 'mongoose';

const SchemaTypes = Schema.Types;

const userSchema = new Schema({
  _id: SchemaTypes.ObjectId,
  username: String,
  password_hashed: String,
  passsword_salt: String,
  email: String,
  phone_number: String,
  full_name: String,
  account_type: String,
});

const User = model('User', userSchema, 'users');
export default User;
