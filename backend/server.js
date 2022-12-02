const express = require('express');


// Create express app
const webapp = express();

// Import database operations
const lib = require('./dbFunctions');

// Root endpoint
webapp.get('/', (req, res) => {
  res.json({ message: 'Welcome to our web app' });
});

// Other API endpoints
webapp.get('/parks', async (req, res) => {
  try {
    const results = await lib.getAllParks();
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

webapp.get('/parks/name/:name', async (req, res) => {
    try {
        const results = await lib.getParkByName(req.params.name);
        res.status(200).json({ data: results });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

webapp.get('/parks/code/:code', async (req, res) => {
    try {
        const results = await lib.getParkByName(req.params.code);
        res.status(200).json({ data: results });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

webapp.get('/species/name/:name', async (req, res) => {
    try {
        const results = await lib.getParkByName(req.params.name);
        res.status(200).json({ data: results });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

// Default response for any other request
webapp.use((_req, res) => {
  res.status(404);
});

module.exports = webapp; // for testing