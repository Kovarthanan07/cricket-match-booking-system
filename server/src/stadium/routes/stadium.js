const express = require('express');
const { is_anyone } = require('../../../middleware/auth');
const auth = require('../../../middleware/auth');
const router = new express.Router();

const {
  create_stadium,
  view_stadium,
  update_stadium,
  delete_stadium,
  view_all_stadiums,
} = require('../controller/stadium');

router.post('/api/createStadium', auth.is_admin, create_stadium);
router.get('/api/viewStadium/:stadium_id', is_anyone, view_stadium);
router.patch('/api/updateStadium/:stadium_id', auth.is_admin, update_stadium);
router.delete('/api/deleteStadium/:stadium_id', auth.is_admin, delete_stadium);
router.get('/api/viewAllStadiums', auth.is_anyone, view_all_stadiums);

module.exports = router;
