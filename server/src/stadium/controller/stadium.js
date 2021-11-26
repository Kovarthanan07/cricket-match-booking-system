const Stadium = require('../model/stadium');

const create_stadium = async (req, res) => {
  try {
    const stadium = new Stadium({ ...req.body });
    await stadium.save();

    res.status(201).send(stadium);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const view_stadium = async (req, res) => {
  try {
    const stadium = await Stadium.findById(req.params.stadium_id);
    if (!stadium) {
      throw new Error('Stadium not found...');
    }
    res.send(stadium);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const update_stadium = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedKeys = ['name', 'city', 'country', 'capacity'];

  const isValidOperation = updates.every((update) => {
    return allowedKeys.includes(update);
  });

  if (!isValidOperation) {
    res.status(400).send({ message: 'invalid request' });
  }

  try {
    const stadium = await Stadium.findById(req.params.stadium_id);
    if (!stadium) {
      res.status(404).send({ message: 'stadium not found' });
    }
    updates.forEach((update) => {
      stadium[update] = req.body[update];
    });

    await stadium.save();
    res.send(stadium);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const delete_stadium = async (req, res) => {
  try {
    const stadium = await Stadium.deleteOne({ _id: req.params.stadium_id });
    res.send(stadium);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const view_all_stadiums = async (req, res) => {
  try {
    const stadiums = await Stadium.find();
    res.send(stadiums);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = {
  create_stadium,
  view_stadium,
  update_stadium,
  delete_stadium,
  view_all_stadiums,
};
