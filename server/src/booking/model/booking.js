const mongoose = require('mongoose');

const booking_schema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Ticket',
    },

    match: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Match',
    },

    ticket_count: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ['cancelled', 'active', 'completed'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('Booking', booking_schema);

module.exports = Booking;
