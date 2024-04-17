// server/routes/data.js

const express = require('express');
const router = express.Router();
const SampleData = require('../models/SampleData');

// @route   POST api/data/import
// @desc    Import raw sample data
// @access  Public
router.post('/import', async (req, res) => {
  try {
    const rawData = req.body;
    await SampleData.insertMany(rawData);
    res.json({ success: true, message: 'Data imported successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/data/summary
// @desc    Generate summary
// @access  Public
router.get('/summary', async (req, res) => {
  try {
    const summary = await generateSummary();
    res.json(summary);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Function to generate summary
async function generateSummary() {
  const data = await SampleData.find();

  // Implement logic to generate summary

  return { summary: 'Summary data' };
}

module.exports = router;
