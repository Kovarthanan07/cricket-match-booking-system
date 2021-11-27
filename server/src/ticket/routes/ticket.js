const express = require('express');
const auth = require('../../../middleware/auth');
const router = new express.Router();

const {
  create_ticket,
  view_ticket,
  update_ticket,
  delete_ticket,
  view_all_ticket,
} = require('../controller/ticket');

router.post('/api/createTicket', auth.is_admin, create_ticket);
router.get('/api/viewTicket/:ticket_id', auth.is_anyone, view_ticket);
router.patch('/api/updateTicket/:ticket_id', auth.is_admin, update_ticket);
router.delete('/api/deleteTicket/:ticket_id', auth.is_admin, delete_ticket);
router.get('/api/viewAllTicket', auth.is_anyone, view_all_ticket);

module.exports = router;
