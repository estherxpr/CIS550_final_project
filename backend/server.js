const express = require('express');

// Create express app
const app = express();
const cors = require('cors');

app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));
app.use(express.urlencoded({ extended: true }), express.json());
const lib = require('./dbFunctions');

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to CIS550 Project' });
});

/*
  for this server, we have four main endpoints: states, parks, species, trades, and search

  for every response, we will return a json object with two keys: data or error,
  if the request is successful, we will return data, otherwise, we will return error
  data can be an array if the request is for a collection
  or an object if the request is for a specific item
  error will be a string, which contains the error message
* */

/*
  get all parks in the database
* */
app.get('/parks', async (req, res) => {
  try {
    const results = await lib.getAllParks();
    res.status(200).json({ data: results });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

/*
  get a specific park by park name or by park id
  @param park: park name or park id
  @return: a json object with two keys: data or error
  example:
  {
    "data": {
    "Code": "BADL",
    "Name": "Badlands National Park",
    "State": "SD",
    "Acres": 242756,
    "Latitude": "43.75",
    "Longitude": "-102.50"
    }
  }
* */
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

/*
  This endpoint is used to get filtered species by query
* */
app.get('/species', async (req, res) => {
  const args = req.query;
  // important: for the safety concern, actually we should check if the keys are valid
  // but for now, we just assume the keys are valid
  try {
    if (args === undefined || Object.keys(args).length === 0) {
      const result = await lib.getAllSpecies();
      res.status(200).json({ data: result });
      return;
    }
    const result = await lib.getSpeciesByFilter(args);
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

/*
  get a specific species by species name or by species id
  @param species: species name or species id
  @return: a json object with two keys: data or error
  example:

* */
app.get('/species/:species', async (req, res) => {
  try {
    const { species } = req.params;
    const result = await lib.getSpeciesByName(species);
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

app.get('/search/parks', async (req, res) => {
  // here using keyword to switch, and use expectedFiled to select the field we want to search
  // every single query can be a list, connected by #
  const {
    keyword, args,
  } = req.query;
  if (!keyword) {
    res.status(400).json({ error: 'Please provide a keyword or park name' });
  }

  try {
    switch (keyword) {
      case 'fireSuffer': { // this correlated to query 8
        const result = await lib.getParksByFireSuffer(args);
        res.status(200).json({ data: result });
        return;
      }
      case ('fireClass'): { // this correlated to query 5
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

app.get('/search/species', async (req, res) => {
  const {
    keyword, ...args
  } = req.query;

  try {
    // const result = await lib.getSpeciesBySpecificState(category, state1, state2, states);
    // we can also add some pagination here
    let result;
    // by default, we will parese args(which is an object) into dbFunction
    switch (keyword) {
      case 'orderDistribution': {
        result = await lib.getOrderListInState(args);
        break;
      }
      case 'aboundanceByState': {
        result = await lib.getSpeciesAbundanceByState(args); // args: state
        break;
      }
      case 'sameCountry': {
        result = await lib.getSpeciesSameCountry(args); // non args
        break;
      }
      case 'sameFamily': {
        result = await lib.getFilteredSpecies(args); // args: (park, family, order);
        break;
      }
      // Return all Species in certain category live in some state but not some other
      // state without severe fire
      case 'threeStates': {
        result = await lib.getSpeciesBySpecificState(args);
        // args: category, in_state1, in_state2, not_in_state3,
        break;
      }
      default: {
        break;
      }
    }
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.get('/orders/:state', async (req, res) => {
  const { state } = req.params;
  try {
    const result = await lib.getOrderListInState(state);
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Default response for any other request
app.all((req, res) => {
  res.status(404);
});

module.exports = app; // for testing
