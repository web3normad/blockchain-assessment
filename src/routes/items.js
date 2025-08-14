const express = require('express');
const fs = require('fs').promises; // Use promises version for better async handling
const path = require('path');
const router = express.Router();
const DATA_PATH = path.join(__dirname, '../data/items.json');

// Utility to read data (converted to async for non-blocking)
async function readData() {
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, return empty array
      return [];
    }
    throw error;
  }
}

// Utility to write data safely
async function writeData(data) {
  try {
    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    throw new Error(`Failed to write data: ${error.message}`);
  }
}

// Input validation middleware
const validateItem = (req, res, next) => {
  const { name, category, price } = req.body;
  
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'Name is required and must be a non-empty string' });
  }
  
  if (!category || typeof category !== 'string' || category.trim().length === 0) {
    return res.status(400).json({ error: 'Category is required and must be a non-empty string' });
  }
  
  if (price === undefined || typeof price !== 'number' || price < 0) {
    return res.status(400).json({ error: 'Price is required and must be a non-negative number' });
  }
  
  next();
};

// GET /api/items
router.get('/', async (req, res, next) => {
  try {
    const data = await readData();
    const { limit, q } = req.query;
    let results = data;

    // Search functionality with improved filtering
    if (q && typeof q === 'string') {
      const searchTerm = q.toLowerCase().trim();
      results = results.filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
      );
    }

    // Limit functionality with validation
    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (isNaN(limitNum) || limitNum < 0) {
        return res.status(400).json({ error: 'Limit must be a non-negative number' });
      }
      results = results.slice(0, limitNum);
    }

    res.json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/items/:id
router.get('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid item ID' });
    }

    const data = await readData();
    const item = data.find(i => i.id === id);
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json({
      success: true,
      data: item
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/items
router.post('/', validateItem, async (req, res, next) => {
  try {
    const { name, category, price } = req.body;
    
    // Sanitize input data
    const item = {
      name: name.trim(),
      category: category.trim(),
      price: Number(price)
    };
    
    const data = await readData();
    
    // Generate ID safely (better than Date.now() for concurrent requests)
    item.id = data.length > 0 ? Math.max(...data.map(i => i.id)) + 1 : 1;
    
    data.push(item);
    await writeData(data);
    
    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: item
    });
  } catch (err) {
    next(err);
  }
});

// PUT /api/items/:id (Update item)
router.put('/:id', validateItem, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid item ID' });
    }

    const { name, category, price } = req.body;
    const data = await readData();
    const itemIndex = data.findIndex(i => i.id === id);
    
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    // Update item
    data[itemIndex] = {
      id,
      name: name.trim(),
      category: category.trim(),
      price: Number(price)
    };
    
    await writeData(data);
    
    res.json({
      success: true,
      message: 'Item updated successfully',
      data: data[itemIndex]
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/items/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid item ID' });
    }

    const data = await readData();
    const itemIndex = data.findIndex(i => i.id === id);
    
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    const deletedItem = data.splice(itemIndex, 1)[0];
    await writeData(data);
    
    res.json({
      success: true,
      message: 'Item deleted successfully',
      data: deletedItem
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;