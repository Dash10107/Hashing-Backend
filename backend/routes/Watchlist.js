const express = require('express');
const router = express.Router();
const Watchlist = require('../models/Watchlist');
const verifyToken = require('../middleware/Token');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
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


  // Define the route to fetch options
  router.get('/options', verifyToken,(req, res) => {
    const options = [];
  
    // Construct the absolute path to the CSV file
    const csvFilePath = path.join(__dirname, 'list.csv');
  
    // Read the CSV file and parse it
    fs.createReadStream(csvFilePath)
      .pipe(csv({ separator: ',' }))
      .on('data', (row) => {
        // Extract symbol and company name from each row
        const symbol = row.Symbol;
        const name = row.Name;    
        // Push symbol and company name to the options array
        options.push({ value: symbol, label: `${symbol} - ${name}` });
      })
      .on('end', () => {
        // Send the options array as response
        res.json(options);
      })
      .on('error', (err) => {
        // Handle error if any
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch options' });
      });
  });
  
module.exports = router;
