import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: String,
  password_hashed: String,
  email: String,
  email_verified: Boolean,
  phone_number: String,
  full_name: String,
  account_type: String,
});

const User = model('User', userSchema, 'users');
export default User;
