import { Schema, model } from 'mongoose';

const SchemaTypes = Schema.Types;

const guestSchema = new Schema({
  event: {
    type: SchemaTypes.ObjectId,
    ref: 'Event',
  },
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    default: null,
  },
  email: String,
  info: {
    phone_number: String,
    gender: String,
    major: String,
    answer: String,
    full_name: String,
  },
  status: {
    email_verified: Boolean,
    ticket_approved: Boolean,
  },
  ticket: {
    code: { type: String, default: null },
    issue_at: { type: Date, default: null },
    checkin_at: { type: Date, default: null },
  },
}, { versionKey: false });

const Guest = model('Guest', guestSchema, 'guests');
export default Guest;
