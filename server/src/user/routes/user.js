const express = require('express');
const auth = require('../../../middleware/auth');
const router = new express.Router();

const {
  create_admin,
  create_customer,
  update_customer,
  login,
  logout,
  update_customer_password,
  update_admin_password,
  get_all_customers,
} = require('../controller/user');

router.post('/api/login', login);
router.get('/api/logout', logout);
router.post('/api/createAdmin', create_admin);
router.post('/api/createCustomer', create_customer);
router.patch('/api/updateProfile', auth.is_customer, update_customer);
router.patch(
  '/api/updateCustomerpassword',
  auth.is_customer,
  update_customer_password
);
router.patch('/api/updateAdminpassword', auth.is_admin, update_admin_password);
router.get('/api/allCustomers', auth.is_admin, get_all_customers);

module.exports = router;
