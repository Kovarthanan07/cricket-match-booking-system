const express = require('express');
const auth = require('../../../middleware/auth');
const router = new express.Router();

const {
    create_match,
    view_match,
    view_all_match,
    view_all_finished_match,
    view_all_future_match,
    update_match,
    delete_match,
    update_match_status,
} = require('../controller/match');

router.post('/api/createMatch', auth.is_admin, create_match);
router.get('/api/viewMatch/:match_id', auth.is_anyone, view_match);
router.get('/api/viewAllMatch', auth.is_anyone, view_all_match);
router.get(
    '/api/viewAllFinishedMatch',
    auth.is_anyone,
    view_all_finished_match
);
router.get('/api/viewAllFutureMatch', auth.is_anyone, view_all_future_match);
router.patch('/api/updateMatch/:match_id', auth.is_admin, update_match);
router.patch(
    '/api/updateMatchStatus/:match_id',
    auth.is_admin,
    update_match_status
);

router.delete('api/deleteMatch/:match_id', auth.is_admin, delete_match);

module.exports = router;