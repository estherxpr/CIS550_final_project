const mysql = require('mysql2/promise');

let mySQLConnection;

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


// get Species by common_name
const getSpeciesByName = async (name) => {
  try {
    const db = await getDB();
    const query = 'SELECT * FROM Occurence WHERE Common_Names in ( \
                   SELECT Common_Names FROM Species WHERE Common_Name = ?)';
    const params = [name];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

// get Species by name
const getSpeciesBySName = async (s_name) => {
  try {
    const db = await getDB();
    const query = 'SELECT * FROM Occurence WHERE Scientific_Name =  ?';
    const params = [s_name];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

// get Species by abundance
const getSpeciesByAbundance = async (abundance) => {
  try {
    const db = await getDB();
    const query = 'SELECT * FROM Occurence WHERE abundance =  ?';
    const params = [abundance];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};



// get species by ParkName
const getSpeciesByParkName = async (parkname) => {
  try {
    const db = await getDB();
    const query = 'SELECT * FROM Occurence WHERE Park_Name = ?';
    const params = [parkname];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

// Queries in Milestone3
// Query 2, select species by category
const getSpeciesByCategory = async (category) => {
  try {
    const db = await getDB();
    const query = "SELECT s.Scientific_Name as bird_name \
                   FROM Species s left join  Family_Order FO on s.Family = FO.Family \
                   left join Order_Category OC on FO.SpeciesOrder = OC.SpeciesOrder \
                   WHERE OC.Category = ? ";
    const params = [category];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

//Query3 Select all the animals that are both imported and exported by the same country.
const getSpeciesSameCountry = async () => {
  try {
    const db = await getDB();
    const query = "SELECT DISTINCT S.Taxon \
                   FROM Species_Trade S \
                   WHERE Exporter IN (SELECT Importer FROM Species_Trade S2 \
                   WHERE S2.Taxon=S.Taxon)";
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

// Query 4, Select all animals living in CA’s national park
const getSpeciesByState = async (state) => {
  try {
    const db = await getDB();
    const query = "SELECT o.Scientific_Name as CA_animal \
                  FROM Occurrence o \
                  WHERE o.Park_Name in \
                  (SELECT Name FROM National_Park np WHERE np.State = ? )";
    const params = [state];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

// Query5: Select all parks that in a state that has fire of class A
const getSpeciesByFireClass = async (fire_size) => {
  try {
    const db = await getDB();
    const query = "SELECT Name \
                   FROM National_Park np \
                   WHERE np.State in ( \
                   select distinct state \
                   from Wild_fire wf \
                   where wf.FIRE_SIZE = ?)";
    const params = [fire_size];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

//Query6: Get species abundance of a state:
const getSpeciesAbundanceByState = async (state) => {
  try {
    const db = await getDB();
    const query = "SELECT COUNT(DISTINCT O.Scientific_Name) AS SPECIES_NUM  \
                  FROM Occurrence O WHERE O.Park_Name IN \
                  (SELECT NP.Name FROM National_Park NP WHERE NP.state = ? ) ";
    const params = [fire_size];
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
  getParkByName,
  getParkByCode,
  getSpeciesByName,
  getSpeciesBySName,
  getSpeciesByAbundance,
  getSpeciesByParkName,
  getSpeciesByCategory,
  getSpeciesSameCountry,
  getSpeciesByState,
  getSpeciesByFireClass,
  getSpeciesAbundanceByState
}