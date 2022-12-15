const mysql = require('mysql2/promise');

let mySQLConnection;

const validSpeciesFileds = new Map(
  [['species_id', 'species_ID'],
    ['occr_id', 'Occr_ID'],
    ['park_id', 'Park_ID'], ['scientific_name', 'Scientific_Name'],
    ['park_name', 'Park_Name'], ['occurrence', 'Occurrence'],
    ['abundance', 'Abundance'], ['seasonality', 'Seasonality'], ['family', 'Family'],
    ['conservation_status', 'Conservation_Status'],
    ['speciesOrder', 'SpeciesOrder'],
    // eslint-disable-next-line quotes
    ['order', 'Order'], ['category', 'Category'], ['common_names', 'Common_Names'],
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

// get all states
const getAllStates = async () => {
  try {
    const db = await getDB();
    const query = 'SELECT distinct state FROM National_Park';
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
  console.log('query:', query);
  try {
    const db = await getDB();
    const params = [];
    const [rows] = await db.execute(query);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

// // get state by name
// const getStateByName = async (state) => {
//   try {
//     const db = await getDB();
//     const query = '';
//     const params = [state];
//     const [rows] = await db.execute(query, params);
//     return rows;
//   } catch (err) {
//     console.log(`Error: ${err.message}`);
//     throw new Error('Error executing the query');
//   }
// };

// get Species by common_name
const getSpeciesByName = async (name) => {
  try {
    const db = await getDB();
    const query = `
    SELECT SC.species_ID , SC.Scientific_Name AS scientific_name,
    SC.Common_Names AS common_names,
    SC.Category AS category,
    SC.Order , SC.Family AS family, SC.Genus AS genus
    FROM Species_complete SC
    WHERE Scientific_Name = '${name}' 
    OR Common_Names LIKE '%${name}%' LIMIT 1`;
    // const params = [name];
    const params = [];
    const [rows] = await db.execute(query, params);
    if (rows.length === 0) return {};
    return rows[0];
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

// get species by ParkName
const getSpeciesByParkName = async (parkname) => {
  try {
    const db = await getDB();
    const query = 'SELECT * FROM Occurrence WHERE Park_Name = ?';
    const params = [parkname];
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
    const query = `SELECT DISTINCT S.Taxon 
                   FROM Species_Trade S 
                   WHERE Exporter IN (SELECT Importer FROM Species_Trade S2 
                   WHERE S2.Taxon=S.Taxon)`;
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

// Query5: Select all parks that in a state that has fire of class A
const getParksByFireClass = async (args) => {
  try {
    const db = await getDB();
    const query = `SELECT Name 
                   FROM National_Park np 
                   WHERE np.State in ( 
                   select distinct state 
                   from Wild_fire wf 
                   where wf.FIRE_SIZE = ?)`;
    const params = [args.fireClass];
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
  const { park, family, order } = args;
  try {
    const db = await getDB();
    const query = ' WITH Temp AS (\
					SELECT ID, O.Scientific_Name, Family, Park_Name, State\
					FROM Occurrence O JOIN National_Park NP ON O.Park_ID = NP.Code\
						JOIN Species S ON S.Scientific_Name = O.Scientific_Name\
					)\
					SELECT t1.Family, t1.Park_Name, COUNT(*) AS NUM\
					FROM Temp t1, Temp t2\
					WHERE t1.Park_Name = t2.Park_Name AND t1.Park_Name = ?\
					AND t1.Family = ?\
					AND t1.Family = t2.Family AND t1.Scientific_Name <> t2.Scientific_Name\
					GROUP BY t1.Family\
					ORDER BY NUM ?, t1.Family';
    const params = [park, family, order];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

// Query8: filter park by fire suffer:
const getParksByFireSuffer = async (args) => {
  const { percent } = args;
  try {
    const db = await getDB();
    const num = 5 * percent;
    const query = ` WITH TEMP AS (SELECT Scientific_Name, COUNT(*)\
					FROM Wild_fire W\
						JOIN Occurrence O on W.National_park=O.Park_Name\
					GROUP BY Scientific_Name\
					ORDER BY COUNT(*) DESC\
					LIMIT 2000)\
					SELECT Name\
					FROM National_Park N JOIN Occurrence O on N.Name=O.Park_Name\
					WHERE O.Scientific_Name IN (SELECT Scientific_Name  FROM TEMP)\
					GROUP BY N.Name\
					HAVING COUNT(*)>(SELECT 0.01*COUNT(*)\
                         FROM National_Park N2\
                         WHERE N2.Name=N.Name\   GROUP BY N2.Name)\
					ORDER BY  N.Name\
					LIMIT ${num}`;
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

    // const params = [state];
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
                      FROM Order_Category t 
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

module.exports = {
  connect,
  getDB,
  closeMySQLConnection,
  getAllParks,
  getAllStates,
  getSpeciesByFilter,
  getFilteredSpecies,
  getTradesBySpecies,
  getParkByName,
  getParkByCode,
  getParksByFireSuffer,
  getParksByFireClass,
  getParksByState,
  getFiresByState,
  getSpeciesByName,
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
};
