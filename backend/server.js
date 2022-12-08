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

app.get('/species/:species', async (req, res) => {
  try {
    const { species } = req.params;
    // let result;
    // check if argument species is the species Id or the species name
    // if (species.length === 9 && !Number.isNaN(parseInt(species.substring(5, 9), 10))) {
    //   result = await lib.getSpeciesByCode(species);
    //   // seems we do not have species Id in the database
    // } else {

    // Here my idea is we might want to return all the results to user,
    // so concat two arrays

    const result = await lib.getSpeciesByName(species);
    // const result2 = await lib.getSpeciesBySName(species);
    // const result = [...result1, ...result2];
    // }
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
    const result = await lib.getSpeciesByFilter(args);
    res.status(200).json({ data: result });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// app.get('/species/:park/:family/:order', async (req, res) => {
//   try {
//     const { park, family, order } = req.params;
//     const result = await lib.getFilteredSpecies(park, family, order);

//     res.status(200).json({ data: result });
//   } catch (err) {
//     res.status(404).json({ error: err.message });
//   }
// });

// app.get('/species/park/:park', async (req, res) => {
//   try {
//     const { park } = req.params;
//     const result = await lib.getSpeciesByParkName(park);
//     // }
//     res.status(200).json({ data: result });
//   } catch (err) {
//     res.status(404).json({ error: err.message });
//   }
// });

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

//  not a good way to define rest api
// Route10: /species/:category/:state1/:state2/:state3/speciesBySpecificState
// Description: Return all Species in certain category live in some state but not some other
//                     state without severe fire
// Route Parameter(s)  :   category, state1, state2, state3
// Query Parameter(s)  :   None
// Route Handler  :  getSpeciesBySpecificState(category, state1, state2, state3)
// Return Type  : JSON
// Return Parameters  : {Scientific_Name(String), Park_Name(String)}
// Expected (Output) Behavior  :
// Case 1:
// Return all Species in certain category live in some state but not some other
//                         state without severe fire

// app.get('/species/:category/:state1/:state2/:state3/speciesBySpecificState', async (req, res) => {
//   try {
//     const {
//       category, state1, state2, state3,
//     } = req.params;
//     const result = await lib.getSpeciesBySpecificState(category, state1, state2, state3);
//     // }
//     res.status(200).json({ data: result });
//   } catch (err) {
//     res.status(404).json({ error: err.message });
//   }
// });

// Default response for any other request
app.all((req, res) => {
  res.status(404);
});

module.exports = app; // for testing
