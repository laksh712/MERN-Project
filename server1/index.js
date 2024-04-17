// server/index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dataRouter = require('./routes/data');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Wather_Infotech', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Body parser middleware
app.use(bodyParser.json());

// Routes
app.use('/api/data', dataRouter);

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
