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
    const params = [state];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

//Query7: filter species according to multiple conditions:
const filterSpecies = async (park,family,order) => {
  try {
    const db = await getDB();
    const query = " WITH Temp AS (\
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
					ORDER BY NUM ?, t1.Family";
    const params = [park,family,order];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

//Query8: filter park by fire suffer:
const getParksByFireSuffer = async (args) => {
  try {
    const db = await getDB();
    const num = 5 * args.percent;
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

//Query9: Find all Species Order distribution in different parks in a State 
const OrderListInState = async (state) => {
  try {
    const db = await getDB();
    const query = " SELECT FO.SpeciesOrder, O.Park_Name, COUNT(*) AS NUM\
					FROM Occurrence O JOIN Species S ON O.Scientific_Name = S.Scientific_Name\
						JOIN Family_Order FO ON FO.Family = S.Family\
					WHERE O.Park_Name IN (\
					SELECT NP.Name FROM National_Park NP WHERE NP.state = ?)\
					GROUP BY FO.SpeciesOrder, O.Park_Name\
					ORDER BY NUM DESC";
	const params = [state];
    const [rows] = await db.execute(query, params);
    return rows;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error('Error executing the query');
  }
};

//Query10: Find all Species in certain category live in some state but not some other state without severe fire
const FindSpeciesInNotIn = async (category,in_state1,in_state2,not_in_state3) => {
  try {
    const db = await getDB();
    const query = " WITH temp as (\
					SELECT s.Scientific_Name, O.Park_Name\
					FROM Species s left join  Family_Order FO on s.Family = FO.Family\
					left join Order_Category OC on FO.SpeciesOrder = OC.SpeciesOrder\
					join Occurrence O on s.Scientific_Name = O.Scientific_Name\
					WHERE OC.Category = ?\
					)\
					SELECT temp.Scientific_Name, temp.Park_Name\
					FROM temp join National_Park on temp.Park_Name = National_Park.Name\
						join Wild_fire Wf on National_Park.State = Wf.STATE\
					WHERE Park_Name in (SELECT Name FROM National_Park np WHERE np.State = ? or np.State = ? )\
					AND Wf.FIRE_SIZE != 'A'\
					AND temp.Scientific_Name not in (\
					SELECT Scientific_Name\
					FROM temp\
					WHERE temp.Park_Name in (SELECT Name FROM National_Park np WHERE np.State = ?));";
	const params = [category,in_state1,in_state2,not_in_state3];
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
