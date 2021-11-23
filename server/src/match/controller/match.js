const Match = require('../model/match');


//problem in commit test
const create_match = async (req, res) => {
  try {
    const match = new Match({ ...req.body });
    await match.save();

    res.status(201).send(match);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const view_match = async (req, res) => {
  try {
    const match = await Match.findById(req.params.match_id);
    if (!match) {
      throw new Error('Match not found...');
    }
    res.send(match);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const view_all_match = async (req, res) => {
  try {
    const matches = await Match.find();
    res.send(matches);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const view_all_finished_match = async (req, res) => {
  try {
    const matches = await Match.find({ status: 'finished' });
    res.send(matches);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const view_all_future_match = async (req, res) => {
  try {
    const matches = await Match.find({ status: 'finished' });
    res.send(matches);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const update_match = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedKeys = ['match_date'];

  const isValidOperation = updates.every((update) => {
    return allowedKeys.includes(update);
  });

  if (!isValidOperation) {
    res.status(400).send({ message: 'invalid request' });
  }

  try {
    const match = await Match.findById(req.params.match_id);
    if (!match) {
      res.status(404).send({ message: 'stadium not found' });
    }
    updates.forEach((update) => {
      match[update] = req.body[update];
    });

    await match.save();
    res.send(match);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const delete_match = async (req, res) => {
  try {
    const match = await Match.deleteOne({ _id: req.params.match_id });
    res.send(match);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const update_match_status = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedKeys = ['status'];

  const isValidOperation = updates.every((update) => {
    return allowedKeys.includes(update);
  });

  if (!isValidOperation) {
    res.status(400).send({ message: 'invalid request' });
  }

  try {
    const match = await Match.findById(req.params.match_id);
    if (!match) {
      res.status(404).send({ message: 'stadium not found' });
    }
    updates.forEach((update) => {
      match[update] = req.body[update];
    });

    await match.save();
    res.send(match);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = {
  create_match,
  view_match,
  view_all_match,
  view_all_finished_match,
  view_all_future_match,
  update_match,
  delete_match,
  update_match_status,
};
