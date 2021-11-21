const Match = require('../model/match');

const create_match = async (req, res) => {
  try {
    const match = new Match({ ...req.body });
    await match.save();

    res.status(201).send(match);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

