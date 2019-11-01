const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = Schema.Types;

const eventTaskSchema = new Schema({
    id: SchemaTypes.ObjectId,
    event_id: SchemaTypes.ObjectId,
    title: String,
    description: String,
    creator_id: SchemaTypes.ObjectId,
    assignee_ids: [SchemaTypes.ObjectId],
    checklists: [{
        id: SchemaTypes.ObjectId,
        title: String,
        item: [{
            id: SchemaTypes.ObjectId,
            title: String,
            checked: Boolean,
            resolve_history: [{
                user_id: {
                    type: SchemaTypes.ObjectId,
                    ref: 'User'
                },
                action: String
            }]
        }]
    }],
    status: String,
    due: Date,
    comments: [{
        id: SchemaTypes.ObjectId,
        timestamp: Date,
        user_id: {
            type: SchemaTypes.ObjectId,
            ref: 'User'
        },
        content: String
    }]
})

const EventTask = mongoose.model('EventTask', eventTaskSchema, 'event_tasks');
module.exports = EventTask;
