const express = require('express');
const router = express.Router();
const {addToWatchlist, removeFromWatchlist, updateWatchlistItems} = require('../controller/watchlistController');

const authMiddleware = require('../middleware/authMiddleware');




router.use(authMiddleware);
router.post('/', addToWatchlist);
router.put('/:id', updateWatchlistItems);
router.delete('/:id', removeFromWatchlist);


module.exports = router;