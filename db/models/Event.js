import { Schema, model } from 'mongoose';

const SchemaTypes = Schema.Types;

const eventSchema = new Schema({
  name: String,
  description: String,
  category: [{
    type: SchemaTypes.ObjectId,
    ref: 'Category',
  }],
  contact: {
    phone_number: String,
    email: String,
    facebook: String,
    website: String,
  },
  location: {
    place: String,
    address: String,
    latitude: Number,
    longitude: Number,
  },
  start_time: Date,
  end_time: Date,
});

const Event = model('Event', eventSchema, 'events');
export default Event;
