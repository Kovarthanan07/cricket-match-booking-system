const jwt = require('jsonwebtoken');
const User = require('../src/user/model/user');

const is_admin = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (user.role !== 'admin') {
      throw new Error('Only admin is allowed');
    }

    req.token = token;
    req.admin = user;
    next();
  } catch (e) {
    res.status(401).send({ error: e.message });
  }
};

const is_customer = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (user.role !== 'customer') {
      throw new Error('Only customer is allowed');
    }

    req.token = token;
    req.customer = user;
    next();
  } catch (e) {
    res.status(401).send({ error: e.message });
  }
};

const is_anyone = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);

    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (user.role !== 'admin' && user.role !== 'customer') {
      throw new Error('Only customer or admin is allowed');
    }

    req.token = token;
    if (user.role === 'admin') {
      req.admin = user;
    } else if (user.role === 'customer') {
      req.customer = user;
    }

    next();
  } catch (e) {
    res.status(401).send({ error: e.message });
  }
};

const auth = {
  is_admin,
  is_customer,
  is_anyone,
};

module.exports = auth;
