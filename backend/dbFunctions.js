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
      const query = '';
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

// get species by name
const getSpeciesByName = async (name) => {
    try {
      const db = await getDB();
      const query = '';
      const params = [name];
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
    getSpeciesByName
}