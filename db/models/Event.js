const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = Schema.Types;

const eventSchema = new Schema({
    _id: SchemaTypes.ObjectId,
    name: String,
    description: String,
    category: [{
        type: SchemaTypes.ObjectId,
        ref: 'Category'
    }],
    contact: {
        phone_number: String,
        email: String,
        facebook: String,
        website: String
    },
    start_time: Date,
    end_time: Date
})

const Event = mongoose.model('Event', eventSchema, 'events');
module.exports = Event;