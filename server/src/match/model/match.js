const mongoose = require('mongoose');


//type should change
const match_schema = new mongoose.Schema(
  {
    venue: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Stadium',
    },
    match_date: {
      type: Date,
      required: true,
    },
    viewers_count: {
      type: Number,
      default: 0,
    },
    playing_teams: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ['finished', 'future', 'cancelled'],
    },
  },
  {
    timestamps: true,
  }
);

match_schema.virtual('bookingMatch', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'match',
});

const Match = mongoose.model('Match', match_schema);

module.exports = Match;
