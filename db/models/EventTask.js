import { Schema, model } from 'mongoose';

const SchemaTypes = Schema.Types;

const eventTaskSchema = new Schema({
  _id: SchemaTypes.ObjectId,
  event: {
    type: SchemaTypes.ObjectId,
    ref: 'Event',
  },
  title: String,
  description: String,
  creator: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
  },
  assignees: [{
    type: SchemaTypes.ObjectId,
    ref: 'User',
  }],
  checklists: [{
    _id: SchemaTypes.ObjectId,
    title: String,
    item: [{
      _id: SchemaTypes.ObjectId,
      title: String,
      checked: Boolean,
      resolve_history: [{
        user: {
          type: SchemaTypes.ObjectId,
          ref: 'User',
        },
        action: String,
      }],
    }],
  }],
  status: String,
  due: Date,
  comments: [{
    _id: SchemaTypes.ObjectId,
    timestamp: Date,
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
    },
    content: String,
  }],
});

const EventTask = model('EventTask', eventTaskSchema, 'event_tasks');
export default EventTask;
