const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Tag = require('./tag')

const eventPlanSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  /*
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  }*/
  location: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
  },
  tags: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: Tag
  }],
  description: {
    type: String,
    required: true,
  },
  popularity: {
    type: Number,
    default: 0,
  }
});

const EventPlan = mongoose.model('EventPlan', eventPlanSchema);

module.exports = EventPlan;