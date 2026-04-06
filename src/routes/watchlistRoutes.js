const express = require('express');
const router = express.Router();
const addToWatchlist = require('../controller/watchlistController');
const authMiddleware = require('../middleware/authMiddleware');


router.use(authMiddleware);
router.post('/', addToWatchlist);


module.exports = router;