const express = require('express');
const router = express.Router();
const addToWatchlist = require('../controller/watchlistController');



router.post('/', addToWatchlist);


module.exports = router;