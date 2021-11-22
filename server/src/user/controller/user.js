const User = require('../model/user');

const create_admin = async (req, res) => {
  try {
    const admin = new User({ ...req.body, role: 'admin' });
    await admin.save();

    res.status(201).send(admin);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const create_customer = async (req, res) => {
  try {
    const customer = new User({ ...req.body, role: 'customer' });
    await customer.save();

    res.status(201).send(customer);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const update_customer = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedKeys = [
    'first_name',
    'last_name',
    'mobile',
    'address_line_1',
    'address_line_2',
    'city',
  ];

  const isValidOperation = updates.every((update) => {
    return allowedKeys.includes(update);
  });

  if (!isValidOperation) {
    res.status(400).send({ message: 'invalid request' });
  }

  try {
    const customer = await User.findById(req.customer._id);
    if (!customer) {
      res.status(404).send({ message: 'admin not found' });
    }
    updates.forEach((update) => {
      customer[update] = req.body[update];
    });

    await customer.save();
    res.send(customer);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = {
    create_admin,
    create_customer,
    update_customer
  };