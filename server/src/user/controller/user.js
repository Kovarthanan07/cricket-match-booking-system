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

const login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const logout = async (req, res) => {
  try {
    if (req.admin) {
      req.admin.tokens = req.admin.tokens.filter((token) => {
        return token.token !== req.token;
      });
      await req.admin.save();
    } else if (req.customer) {
      req.customer.tokens = req.customer.tokens.filter((token) => {
        return token.token !== req.token;
      });
      await req.customer.save();
    }
    res.send({ message: 'you are logged out' });
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const update_customer_password = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedKeys = ['password'];

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

const update_admin_password = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedKeys = ['password'];

  const isValidOperation = updates.every((update) => {
    return allowedKeys.includes(update);
  });

  if (!isValidOperation) {
    res.status(400).send({ message: 'invalid request' });
  }

  try {
    const admin = await User.findById(req.admin._id);
    if (!admin) {
      res.status(404).send({ message: 'admin not found' });
    }
    updates.forEach((update) => {
      admin[update] = req.body[update];
    });

    await admin.save();
    res.send(admin);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const get_all_customers = async (req, res) => {
  try {
    const allUsers = await User.find({ role: 'customer' });
    res.send(allUsers);
  } catch (error) {
    res.status(500).send(e.message);
  }
};

// const update_admin = async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedKeys = ['display_name', 'password'];

//   const isValidOperation = updates.every((update) => {
//     return allowedKeys.includes(update);
//   });

//   if (!isValidOperation) {
//     res.status(400).send({ message: 'invalid request' });
//   }

//   try {
//     const admin = await Admin.findById(req.admin._id);
//     if (!admin) {
//       res.status(404).send({ message: 'admin not found' });
//     }
//     updates.forEach((update) => {
//       admin[update] = req.body[update];
//     });

//     await admin.save();
//     res.send(admin);
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
// };

// const delete_admin = async (req, res) => {
//   try {
//     const admin = await Admin.findByIdAndDelete(req.params._id);
//     if (!admin) {
//       res.status(404).send({ message: 'could not delete' });
//       return;
//     }
//     res.send(admin);
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
// };

// const admin_me = async (req, res) => {
//   res.send(req.admin);
// };

// const admin_all = async (req, res) => {
//   try {
//     const all_admins = await Admin.find({});
//     res.send(all_admins);
//   } catch (error) {
//     res.status(400).send();update_customer
//   }
// };

module.exports = {
  create_admin,
  create_customer,
  update_customer,
  login,
  logout,
  update_customer_password,
  update_admin_password,
  get_all_customers,
};
