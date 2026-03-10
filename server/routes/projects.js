const express = require('express');
const router = express.Router();

// Debug log
console.log('📂 Projects route loaded');

// Get all projects (Public)
router.get('/', async (req, res) => {
  try {
    console.log('🔍 GET /api/projects - Fetching...');
    
    // For now, return empty array since we're removing admin functionality
    // In a real scenario, you might want to return some sample projects or fetch from a different source
    const projects = [];
    
    res.json(projects);
  } catch (error) {
    console.error('❌ Error fetching projects:', error);
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
});

module.exports = router;