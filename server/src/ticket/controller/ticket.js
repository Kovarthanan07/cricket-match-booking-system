const Ticket = require('../model/ticket');

const create_ticket = async (req, res) => {
  try {
    const ticket = new Ticket({ ...req.body });
    await ticket.save();

    res.status(201).send(ticket);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const view_ticket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.ticket_id);
    if (!ticket) {
      throw new Error('Ticket not found...');
    }
    res.send(ticket);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const update_ticket = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedKeys = ['name', 'price', 'describtion'];

  const isValidOperation = updates.every((update) => {
    return allowedKeys.includes(update);
  });

  if (!isValidOperation) {
    res.status(400).send({ message: 'invalid request' });
  }

  try {
    const ticket = await Ticket.findById(req.params.ticket_id);
    if (!ticket) {
      res.status(404).send({ message: 'ticket not found' });
    }
    updates.forEach((update) => {
      ticket[update] = req.body[update];
    });

    await ticket.save();
    res.send(ticket);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const delete_ticket = async (req, res) => {
  try {
    const ticket = await Ticket.deleteOne({ _id: req.params.ticket_id });
    res.send(ticket);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const view_all_ticket = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.send(tickets);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = {
  create_ticket,
  view_ticket,
  update_ticket,
  delete_ticket,
  view_all_ticket,
};
