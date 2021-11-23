const Booking = require('../model/booking');

const create_booking = async (req, res) => {
  try {
    const booking = new Booking({ ...req.body });
    await booking.save();

    res.status(201).send(booking);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const view_booking = async (req, res) => {
  try {
    const booking = await Stadium.findById(req.params.booking_id)
      .populate('customer')
      .populate('ticket')
      .populate('match');
    if (!booking) {
      throw new Error('booking not found...');
    }
    res.send(booking);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const view_all_my_booking = async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.customer._id })
      .populate('ticket')
      .populate('match');
    res.send(Bookings);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const view_all_match_booking = async (req, res) => {
  try {
    const bookings = await Booking.find({ match: req.params.match_id })
      .populate('customer')
      .populate('ticket')
      .populate('match');
    res.send(Bookings);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const update_booking = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedKeys = ['ticket_count', 'status'];

  const isValidOperation = updates.every((update) => {
    return allowedKeys.includes(update);
  });

  if (!isValidOperation) {
    res.status(400).send({ message: 'invalid request' });
  }

  try {
    const booking = await Booking.findById(req.params.booking_id);
    if (!booking) {
      res.status(404).send({ message: 'booking not found' });
    }
    updates.forEach((update) => {
      booking[update] = req.body[update];
    });

    await booking.save();
    res.send(booking);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const delete_booking = async (req, res) => {
  try {
    const booking = await Booking.deleteOne({ _id: req.params.booking_id });
    res.send(booking);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = {
  create_booking,
  view_booking,
  view_all_my_booking,
  view_all_match_booking,
  update_booking,
  delete_booking,
};
