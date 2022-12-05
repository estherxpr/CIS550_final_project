const express = require('express');

// Create express app
const app = express();
const cors = require('cors');

app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));
app.use(express.urlencoded({ extended: true }), express.json());
const lib = require('./dbFunctions');

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to CIS550 Project' });
});

// Other API endpoints
app.get('/parks', async (req, res) => {
  try {
    const results = await lib.getAllParks();
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.get('/parks/:park', async (req, res) => {
  const { park } = req.params;
  try {
    let result;
    if (park.length === 4) {
      result = await lib.getParkByCode(park);
    } else {
      result = await lib.getParkByName(park);
    }
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.get('/species/:species', async (req, res) => {
  try {
    const { species } = req.params;
    // let result;
    // check if argument species is the species Id or the species name
    // if (species.length === 9 && !Number.isNaN(parseInt(species.substring(5, 9), 10))) {
    //   result = await lib.getSpeciesByCode(species);
    //   // seems we do not have species Id in the database
    // } else {
    const result = await lib.getSpeciesByName(species);
    // }
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.get('/trades/:species', async (req, res) => {
  try {
    const { species } = req.params;
    const result = await lib.getTradesBySpecies(species);
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// get a colleciton of states, for each state, it contains basic information of state
app.get('/states', async (req, res) => {
  try {
    const results = await lib.getAllStates();
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// get a specific state general info
app.get('/states/:state', async (req, res) => {
  const { state } = req.params;
  try {
    const result = await lib.getStateByName(state);
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.get('/states/:state/parks', async (req, res) => {
  const { state } = req.params;
  try {
    const result = await lib.getParksByState(state);
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.get('/states/:state/species', async (req, res) => {
  const { state } = req.params;
  try {
    const result = await lib.getSpeciesByState(state);
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.get('/states/:state/fires', async (req, res) => {
  const { state } = req.params;
  try {
    const result = await lib.getFiresByState(state);
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// main idea to deal with complex query
// we can divide query into several parts,
// one part is general/common part{orderBy,limit, groupBy},
// another part is specific part{species, state, park, percent, etc}
// we probably can use higher order function to handle this
// it is like a tree structure, each node indicate a filter or a operation
// search/parks indicates that we are searching results for parks
app.get('/search/parks?', async (req, res) => {
  // here using keyword to switch, and use expectedFiled to select the field we want to search
  // every single query can be a list, connected by #
  const {
    keyword, expectedFiled,
    isexpectedFiledUnique,
    groupBy,
    orderBy,
    limit,
    percent,
    fireClass,
  } = req.query;
  if (!keyword || !expectedFiled) {
    res.status(400).json({ error: 'Please provide a keyword or park name' });
  }
  try {
    switch (keyword) {
      case 'fireSuffer': { // this correlated to query 8
        const args = {
          percent,
          orderBy,
          expectedFiled,
          isexpectedFiledUnique,
          limit,
          groupBy,
        };
        const result = await lib.getParksByFireSuffer(args);
        res.status(200).json({ data: result });
        return;
      }
      case ('fireClass'): { // this correlated to query 5
        const args = {
          fireClass, orderBy, expectedFiled, limit, isexpectedFiledUnique, groupBy,
        };
        const result = await lib.getParksByFireClass(args);
        res.status(200).json({ data: result });
        return;
      }

      default: {
        res.status(404).json({ message: 'No such keyword' });
        return;
      }
    }
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Default response for any other request
app.all((req, res) => {
  res.status(404);
});

module.exports = app; // for testing
