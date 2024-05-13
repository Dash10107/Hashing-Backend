const express = require('express');
const router = express.Router();
const Watchlist = require('../models/Watchlist');
const verifyToken = require('../middleware/Token');

// Get watchlist by user ID
router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const watchlist = await Watchlist.findOne({ user: userId });
    if (!watchlist) {
      return res.status(404).json({ message: "Watchlist not found" });
    }
    res.json(watchlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create or update user's watchlist
router.post('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { symbols } = req.body;
    
    let watchlist = await Watchlist.findOne({ user: userId });
    if (!watchlist) {
      watchlist = new Watchlist({ user: userId, symbols: symbols });
    } else {
      // If watchlist exists, update symbols
      watchlist.symbols = symbols;
    }
    await watchlist.save();
    res.status(201).json(watchlist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Remove symbol from user's watchlist
router.delete('/:symbol', verifyToken, async (req, res) => {
    try {
      const userId = req.user.id;
      const watchlist = await Watchlist.findOneAndUpdate(
        { user: userId },
        { $pull: { symbols: req.params.symbol } },
        { new: true }
      );
  
      if (!watchlist) {
        return res.status(404).json({ message: "Watchlist not found" });
      }
  
      // Check if symbol was found and removed from the watchlist
      if (watchlist.symbols.includes(req.params.symbol)) {
        res.json(watchlist);
      } else {
        res.status(404).json({ message: "Symbol not found in watchlist" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
module.exports = router;
