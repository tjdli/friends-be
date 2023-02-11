const eventPlanSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
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
  },
  dateTime: {
    type: Date,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  tags: {
    type: [tagSchema],
  },
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