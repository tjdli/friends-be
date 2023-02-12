const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Tag = require('./tag')
let EventPlan = require('./eventPlan')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
    },
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Tag
        }
    ],
    events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: EventPlan
        }
    ],
    interests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: EventPlan
        }
    ]
  }, {
    timestamps: true,
  });
  
const User = mongoose.model('User', userSchema);
  
module.exports = User;