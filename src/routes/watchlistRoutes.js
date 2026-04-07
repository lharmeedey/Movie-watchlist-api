const express = require('express');
const router = express.Router();
const {addToWatchlist, removeFromWatchlist, updateWatchlistItems} = require('../controller/watchlistController');

const authMiddleware = require('../middleware/authMiddleware');
const  validateRequest  = require('../middleware/validateRequest');
const addToWatchlistSchema = require('../validators/watchlistValidators')




router.use(authMiddleware);
router.post('/', validateRequest(addToWatchlistSchema), addToWatchlist);
router.put('/:id', updateWatchlistItems);
router.delete('/:id', removeFromWatchlist);


module.exports = router;