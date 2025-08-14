const express = require('express');
const fs = require('fs').promises; // Use promises for non-blocking I/O
const path = require('path');
const router = express.Router();
const { mean } = require('../utils/stats'); // Use the utility function
const DATA_PATH = path.join(__dirname, '../data/items.json');

// GET /api/stats
router.get('/', async (req, res, next) => {
  try {
    // Use async file reading to avoid blocking
    const raw = await fs.readFile(DATA_PATH, 'utf8');
    const items = JSON.parse(raw);
    
    if (!Array.isArray(items) || items.length === 0) {
      return res.json({
        success: true,
        data: {
          total: 0,
          averagePrice: 0,
          totalValue: 0,
          priceRange: { min: 0, max: 0 },
          categories: {}
        }
      });
    }

    // Extract prices for calculations
    const prices = items.map(item => item.price).filter(price => typeof price === 'number');
    
    if (prices.length === 0) {
      return res.json({
        success: true,
        data: {
          total: items.length,
          averagePrice: 0,
          totalValue: 0,
          priceRange: { min: 0, max: 0 },
          categories: {}
        }
      });
    }

    // Calculate statistics using the utility function
    const averagePrice = mean(prices);
    const totalValue = prices.reduce((sum, price) => sum + price, 0);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    // Category breakdown
    const categories = items.reduce((acc, item) => {
      const category = item.category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = {
          count: 0,
          totalValue: 0,
          averagePrice: 0
        };
      }
      acc[category].count++;
      if (typeof item.price === 'number') {
        acc[category].totalValue += item.price;
        acc[category].averagePrice = acc[category].totalValue / acc[category].count;
      }
      return acc;
    }, {});

    const stats = {
      total: items.length,
      averagePrice: Number(averagePrice.toFixed(2)),
      totalValue: Number(totalValue.toFixed(2)),
      priceRange: {
        min: minPrice,
        max: maxPrice
      },
      categories,
      generatedAt: new Date().toISOString()
    };

    console.log(`Stats calculated for ${items.length} items`);
    console.log(`Average price: ${stats.averagePrice}`);
    console.log(`Total value: ${stats.totalValue}`);

    res.json({
      success: true,
      data: stats
    });
  } catch (err) {
    console.error('Error calculating stats:', err.message);
    next(err);
  }
});

// GET /api/stats/summary - Quick summary endpoint
router.get('/summary', async (req, res, next) => {
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf8');
    const items = JSON.parse(raw);
    
    const totalItems = items.length;
    const totalValue = items.reduce((sum, item) => sum + (item.price || 0), 0);
    
    res.json({
      success: true,
      data: {
        totalItems,
        totalValue: Number(totalValue.toFixed(2)),
        timestamp: new Date().toISOString()
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;