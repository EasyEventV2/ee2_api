const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = Schema.Types;

const groupSchema = new Schema({
    id: SchemaTypes.ObjectId,
    event_id: SchemaTypes.ObjectId,
    users: [SchemaTypes.ObjectId],
    name: String,
    role_id: SchemaTypes.ObjectId
})

const Group = mongoose.model('Group', groupSchema, 'groups');
module.exports = Group;