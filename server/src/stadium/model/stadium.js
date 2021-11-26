const mongoose = require('mongoose');

const stadium_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

stadium_schema.virtual('matchStadium', {
  ref: 'Match',
  localField: '_id',
  foreignField: 'venue',
});

const Stadium = mongoose.model('Stadium', stadium_schema);

module.exports = Stadium;
