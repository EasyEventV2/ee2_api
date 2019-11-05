const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = Schema.Types;

const guestSchema = new Schema({
    _id: SchemaTypes.ObjectId,
    event_id: {
        type: SchemaTypes.ObjectId,
        ref: 'Event'
    },
    email: String,
    info: {
        phone_number: String,
        gender: String,
        major: String,
        something: String
    },
    status: {
        email_verified: Boolean,
        ticket_approved: Boolean
    },
    ticket: {
        code: String,
        issue_at: { type: Date, default: 0 },
        checkin_at: { type: Date, default: 0 }
    }
})

const Guest = mongoose.model('Guest', guestSchema, 'guests');
module.exports = Guest;