const express = require('express');
const auth = require('../../../middleware/auth');
const router = new express.Router();

const {
  create_booking,
  view_booking,
  view_all_my_booking,
  view_all_match_booking,
  update_booking,
  delete_booking,
} = require('../controller/booking');

router.post('/api/createBooking', auth.is_customer, create_booking);
router.get('/api/viewBooking/:booking_id', auth.is_anyone, view_booking);
router.get('/api/viewAllMyBooking', auth.is_customer, view_all_my_booking);
router.get(
  '/api/viewAllMatchBooking/:match_id',
  auth.is_anyone,
  view_all_match_booking
);
router.patch('/api/updateBooking/:booking_id', auth.is_anyone, update_booking);
router.delete('/api/deleteBooking/:booking_id', auth.is_anyone, delete_booking);

module.exports = router;
