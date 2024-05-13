const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model
  },
  symbols: [String] // Array of stock symbols
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

module.exports = Watchlist;
