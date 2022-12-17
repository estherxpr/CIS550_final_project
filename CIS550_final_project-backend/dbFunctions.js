const mysql = require('mysql2/promise');

let mySQLConnection;
const { MongoClient } = require('mongodb');

const dbURL = 'mongodb+srv://550_final:final_550@cluster0.0empoke.mongodb.net/?retryWrites=true&w=majority/final';
let MongoConnection;

const validSpeciesFileds = new Map(
  [['species_id', 'species_ID'],
    ['occr_id', 'Occr_ID'],
    ['park_id', 'Park_ID'], ['scientific_name', 'Scientific_Name'],
    ['park_name', 'Park_Name'], ['occurrence', 'Occurrence'],
    ['abundance', 'Abundance'], ['seasonality', 'Seasonality'], ['family', 'Family'],
    ['conservation_status', 'Conservation_Status'],
    ['speciesOrder', 'SpeciesOrder'],
    ['order', 'SpeciesOrder'], ['category', 'Category'], ['common_names', 'Common_Names'],
    ['nativeness', 'Nativeness'],
    ['appendix', 'Appendix'], ['genus', 'Genus'],
  ],
);

// Connect to our db on the cloud
const connect = async () => {
  try {
    mySQLConnection = await mysql.createConnection({
      host: 'project-550.cicrqoasmhsn.us-east-2.rds.amazonaws.com',
      user: 'kevin',
      password: '8368018123aA',
      database: 'Project',
    });
    return mySQLConnection;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

const getDB = async () => {
  if (!mySQLConnection) {
    await connect();
  }
  return mySQLConnection;
};

const closeMySQLConnection = async () => {
  await mySQLConnection.end();
};

const connectMG = async () => {
  try {
    MongoConnection = await MongoClient.connect(
      dbURL,
      { useNewUrlParser: true, useUnifiedTopology: true },
    );
    return MongoConnection;
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
};

const getMGDB = async () => {
  if (!MongoConnection) {
    try {
      await connectMG();
    } catch (err) {
      throw new Error(err.message);
    }
  }
  return MongoConnection.db();
};

const closeMongoDBConnection = async () => {
  if (MongoConnection) {
    try {
      await MongoConnection.close();
    } catch (err) {
      throw new Error(err.message);
    }
  }
};

const getUrl = async (s_name) => {
  try {
    const db = await getMGDB();
    const res = await db.collection('img').find(
      { name: s_name },
    ).limit(2).toArray();

    return res;
  } catch (err) {
    throw new Error(err.message);
  }
};

// get all parks
const getAllParks = async () => {
  try {
    const db = await getDB();
    const query = 'SELECT * FROM National_Park';
    const [rows] = await db.execute(query);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

// get park by name
const getParkByName = async (name) => {
  try {
    const db = await getDB();
    const query = 'SELECT * FROM National_Park WHERE Name = ?';
    const params = [name];
    const [rows] = await db.execute(query, params);
    if (rows.length === 0) return {};
    return rows[0];
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

// get park by Code
const getParkByCode = async (code) => {
  try {
    const db = await getDB();
    const query = 'SELECT * FROM National_Park WHERE Code = ?';
    const params = [code];
    const [rows] = await db.execute(query, params);
    if (rows.length === 0) return {};
    return rows[0];
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

const getParkNameByParkCode = async (code) => {
  try {
    const db = await getDB();
    const query = 'SELECT Name FROM National_Park WHERE Code = ?';
    const params = [code];
    const [rows] = await db.execute(query, params);
    if (rows.length === 0) return {};
    return rows[0];
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

// get parks by state
const getParksByState = async (state) => {
  try {
    const db = await getDB();
    // currently using like searching for state because some parks are located in multiple states
    const query = `SELECT * FROM National_Park WHERE State LIKE '%${state}%'`;
    const params = [];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

// get fires by state
const getFiresByState = async (state) => {
  try {
    const db = await getDB();
    const query = 'SELECT * FROM Wild_fire WHERE STATE = ?';
    const params = [state];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

const getFiresByPark = async (park) => {
  try {
    const db = await getDB();
    const query = 'SELECT * FROM Wild_fire WHERE National_park = ?';
    if (park.length === 4) {
      const parkObj = await getParkNameByParkCode(park);
      park = JSON.stringify(parkObj.Name).replace(/^"(.+(?="$))"$/, '$1');
    }
    const params = [park];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

// get all states
const getAllStates = async () => {
  try {
    const db = await getDB();
    const query = 'SELECT DISTINCT state FROM National_Park';
    const [rows] = await db.execute(query);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

const getAllSpecies = async () => {
  try {
    const db = await getDB();
    const query = 'SELECT * FROM Species';
    const [rows] = await db.execute(query);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

const getSpeciesByFilter = async (args) => {
  let subQuery = 'WHERE ';
  const keys = Object.keys(args);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i].toLowerCase();
    if (validSpeciesFileds.has(key)) {
      const value = args[keys[i]];
      const field = validSpeciesFileds.get(key);
      let q = `${field} = '${value}'`;
      if (field === 'Common_Names') {
        q = `${field} LIKE '%${value}%'`;
      }
      if (i === keys.length - 1) {
        subQuery += q;
      } else {
        subQuery += `${q} AND `;
      }
    }
  }
  // here is the simple version, only take occurrence's attributes

  const query = `SELECT * FROM Species_complete ${subQuery};`;

  try {
    const db = await getDB();
    const [rows] = await db.execute(query);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

// get state by name
const getStateByName = async (state) => {
  try {
    const db = await getDB();
    const query = '';
    const params = [state];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

// get Species by common_name
const getSpeciesByName = async (name) => {
  try {
    const db = await getDB();
    const query = `
    SELECT * FROM Species_complete   
                    WHERE Common_Names LIKE '%${name}%' OR Scientific_Name LIKE '%${name}%'`;
    // const params = [name];
    const params = [];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

// get species by ParkName
const getSpeciesByParkName = async (park) => {
  try {
    const db = await getDB();
    const query = 'SELECT * FROM Occurrence WHERE Park_Name = ?';
    if (park.length === 4) {
      const parkObj = await getParkNameByParkCode(park);
      park = JSON.stringify(parkObj.Name).replace(/^"(.+(?="$))"$/, '$1');
    }
    const params = [park];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

const getFeaturedSpeciesByParkName = async (park, num) => {
  try {
    const db = await getDB();
    const query = `SELECT Scientific_Name AS name FROM Occurrence WHERE Abundance = "Abundant" AND Park_Name = ? LIMIT ${num}`;
    if (park.length === 4) {
      const parkObj = await getParkNameByParkCode(park);
      park = JSON.stringify(parkObj.Name).replace(/^"(.+(?="$))"$/, '$1');
    }
    const params = [park];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

const getTradesBySpecies = async (species) => {
  try {
    const db = await getDB();
    const query = 'SELECT * FROM TRADE WHERE Taxon = ?';
    const params = [species];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

// Query3 Select all the animals that are both imported and exported by the same country.
const getSpeciesSameCountry = async () => {
  try {
    const db = await getDB();
    const query = `SELECT  S.Taxon, SC.Common_Names 
                   FROM Wildlife_Trade S, Species_complete SC    
                   WHERE Exporter IN (SELECT Importer FROM Wildlife_Trade S2 
                   WHERE S2.Taxon=S.Taxon) AND S.Taxon=SC.Scientific_Name
                   GROUP BY S.Taxon;`;
    const [rows] = await db.execute(query);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

// Query 4, Select all animals living in CA’s national park
const getSpeciesByState = async (args) => {
  const { state } = args;

  try {
    const db = await getDB();
    const query = `SELECT DISTINCT o.Scientific_Name as species 
                  FROM Occurrence o JOIN National_Park np ON 
                  o.Park_ID = np.Code WHERE np.State LIKE '%${state}%';`;
    // const params = [state];
    const params = [];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

// const getSpeciesNumByState = async (args) => {
//   const { state } = args;
//   console.log(state);
//     try {
//     const db = await getDB();
//     const query = `SELECT COUNT (DISTINCT o.Scientific_Name) as num
//                   FROM Occurrence o JOIN National_Park np ON
//                   o.Park_ID = np.Code WHERE np.State LIKE '%${state}%';`;
//     // const params = [state];
//     const params = [];
//     const [rows] = await db.execute(query,params);
//     return rows;
//   } catch (err) {
//     console.log(`Error: ${err.message}`);
//     throw new Error('Error executing the query');
//   }
// };

// Query5: Select all parks that in a state that has fire of input class
const getParksByFireClass = async (fire_size) => {
  try {
    const db = await getDB();
    const query = `SELECT Code, Name, Acres 
                   FROM National_Park np 
                   WHERE np.State in ( 
                   select distinct state 
                   from Wild_fire wf 
                   where wf.FIRE_SIZE = ?)`;
    const params = [fire_size];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

// Query6: Get species abundance of a state:
const getSpeciesAbundanceByState = async (args) => {
  const { state } = args;
  try {
    const db = await getDB();
    const query = `SELECT O.Park_Name, O.Park_ID, COUNT(DISTINCT O.Scientific_Name) AS SPECIES_NUM
    FROM Occurrence O WHERE O.Park_Name IN
    (SELECT NP.Name FROM National_Park NP WHERE NP.state = ? )
    GROUP BY O.Park_Name;`;
    const params = [state];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

// Query7: filter species according to multiple conditions:
const getFilteredSpecies = async (args) => {
  const { park, family } = args;
  try {
    const db = await getDB();
    const query = `WITH Temp AS (
          SELECT SC.Scientific_Name, Family, Park_Name, SC.Common_Names
          FROM Species_complete SC)
          SELECT t1.Scientific_Name, t1.Common_Names, t1.Park_Name, COUNT(*) AS NUM
          FROM Temp t1, Temp t2
          WHERE t1.Park_Name = t2.Park_Name AND t1.Park_Name = ?
          AND t1.Family = ?
          AND t1.Family = t2.Family AND t1.Scientific_Name <> t2.Scientific_Name
          GROUP BY t1.Family
          ORDER BY NUM, t1.Family`;
    const params = [park, family];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};
// Query8: filter park by fire suffer:
const getParksByFireSuffer = async (percent) => {
  try {
    const db = await getDB();
    const num = Math.floor(0.56 * percent);
    // console.log("num = ", num);
    const query = ` SELECT sp.Park_ID AS Code, sp.Park_Name AS Name, np.Acres AS Acres
                  FROM Suffered_Park sp JOIN National_Park np ON sp.Park_ID = np.Code
                  GROUP BY Code, Name
                  ORDER BY sum(suffer_num) DESC
                  LIMIT ${num};`;
    const params = [num];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

// Query9: Find all Species Order distribution in different parks in a State
const getOrderListInState = async (args) => {
  const { state } = args;
  try {
    const db = await getDB();
    const query = `SELECT FO.SpeciesOrder, O.Park_Name, COUNT(*) AS NUM
            FROM Occurrence O JOIN Species S ON O.Scientific_Name = S.Scientific_Name
            JOIN Family_Order FO ON FO.Family = S.Family
            WHERE O.Park_Name IN (
            SELECT NP.Name FROM National_Park NP WHERE NP.state = '${state}')
            GROUP BY FO.SpeciesOrder, O.Park_Name
            ORDER BY NUM DESC`;

    const [rows] = await db.execute(query);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

/*
  Find all Species in certain category
  live in some state but not some other state without severe fire
* */

const getSpeciesBySpecificState = async (args) => {
  const {
    category, state1, state2, state3,
  } = args;
  try {
    const db = await getDB();
    const query = `WITH temp as (
        SELECT s.Scientific_Name, O.Park_Name
        FROM Species s left join  Family_Order FO on s.Family = FO.Family
        left join Order_Category OC on FO.SpeciesOrder = OC.SpeciesOrder
        join Occurrence O on s.Scientific_Name = O.Scientific_Name
        WHERE OC.Category = ?)
        SELECT temp.Scientific_Name, temp.Park_Name
        FROM temp join National_Park on temp.Park_Name = National_Park.Name
        JOIN Wild_fire Wf on National_Park.State = Wf.STATE
        WHERE Park_Name in (SELECT Name FROM National_Park np WHERE np.State = ? or np.State = ? ) 
        AND Wf.FIRE_SIZE != 'A'
        AND temp.Scientific_Name not in (
          SELECT Scientific_Name FROM temp
        WHERE temp.Park_Name in (SELECT Name FROM National_Park np WHERE np.State = ?));`;
    const params = [category, state1, state2, state3];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

// get allcategories
const getAllCategories = async () => {
  try {
    const db = await getDB();
    const query = `SELECT distinct t.Category 
                      FROM Order_Category t WHERE t.Category <> 'Category'
                      ORDER BY t.Category ASC`;
    const [rows] = await db.execute(query);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

// get order by category
const getOrdersByCategory = async (category) => {
  try {
    const db = await getDB();
    // currently using like searching for state because some parks are located in multiple states
    const query = `SELECT distinct t.SpeciesOrder
                    FROM Order_Category t
                    WHERE Category = '${category}' and SpeciesOrder != 'None'
                    ORDER BY SpeciesOrder ASC;`;
    const params = [];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

const getFamiliesbyOrder = async (order) => {
  try {
    const db = await getDB();
    // currently using like searching for state because some parks are located in multiple states
    const query = `SELECT distinct t.Family
                  FROM Family_Order t
                  WHERE SpeciesOrder = '${order}' and Family != 'None'
                  ORDER BY Family ASC;`;
    const params = [];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

const getSpeciesbyFamily = async (family) => {
  try {
    const db = await getDB();
    // currently using like searching for state because some parks are located in multiple states
    const query = `SELECT Distinct Scientific_Name
                    FROM Species t
                    WHERE Family = '${family}' 
                    ORDER BY Scientific_Name ASC;`;
    const params = [];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

const getSpeciesDistribution = async (name) => {
  try {
    const db = await getDB();
    const query = `
  SELECT Park_Name, Occurrence, Seasonality, Nativeness, Abundance
  FROM Species_complete SC
  WHERE Scientific_Name = '${name}' 
  ORDER BY Park_Name `;

    const params = [];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

module.exports = {
  connect,
  getDB,
  closeMySQLConnection,
  connectMG,
  getMGDB,
  closeMongoDBConnection,
  getUrl,
  getAllParks,
  getAllStates,
  getSpeciesByFilter,
  getStateByName,
  getFilteredSpecies,
  getTradesBySpecies,
  getParkByName,
  getParkByCode,
  getParkNameByParkCode,
  getParksByFireSuffer,
  getParksByFireClass,
  getParksByState,
  getFiresByState,
  getFiresByPark,
  getSpeciesByName,
  getFeaturedSpeciesByParkName,
  getAllSpecies,
  getSpeciesByParkName,
  getSpeciesSameCountry,
  getSpeciesByState,
  getSpeciesAbundanceByState,
  getSpeciesBySpecificState,
  getOrderListInState,
  getAllCategories,
  getOrdersByCategory,
  getFamiliesbyOrder,
  getSpeciesbyFamily,
  getSpeciesDistribution,
};
