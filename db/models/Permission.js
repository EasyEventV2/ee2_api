const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = Schema.Types;

const permissionSchema = new Schema({
    _id: SchemaTypes.ObjectId,
    data: {
        target: String,
        scope: String,
        action: String
    }
})

const Permission = mongoose.model('Permission', permissionSchema, 'permissions');
module.exports = Permission;