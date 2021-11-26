const express = require('express');
const auth = require('../../../middleware/auth');
const router = new express.Router();

const {
  create_news,
  view_news,
  update_News,
  view_all_news,
  delete_news,
} = require('../controller/news');

router.post('/api/createNews', auth.is_admin, create_news);
router.get('/api/viewNews/:news_id', auth.is_anyone, view_news);
router.patch('/api/updateNews/:news_id', auth.is_admin, update_News);
router.delete('api/deleteNews/:news_id', auth.is_admin, delete_news);
router.get('/api/viewAllNews', auth.is_anyone, view_all_news);

module.exports = router;
