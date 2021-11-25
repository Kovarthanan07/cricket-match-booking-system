const mongoose = require('mongoose');

const ticket_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    describtion: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

ticket_schema.virtual('bookingTicket', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'ticket',
});

const Ticket = mongoose.model('Ticket', ticket_schema);

module.exports = Ticket;
