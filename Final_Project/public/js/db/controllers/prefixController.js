import postgres from '../utils/db.js';

let result = '';

// Get All Prefix List. Only return Prefix where isDelete is false.
const getAllPrefix = async () => {
  const client = await postgres.connect();
  try {
    result = await client.query('SELECT * FROM prefix;');
    return result.rows;
  } catch (err) {
    console.error('Error fetching all Prefixes :', err);
    throw err;
  } finally {
    client.release();
  }
};

// Get Prefixs By ID. Include deleted Prefix as well.
const getPrefixById = async (id) => {
  const client = await postgres.connect();
  try {
    result = await client.query('SELECT * FROM prefix WHERE id = $1;', [id]);
    return result.rows;
  } catch (err) {
    console.error(`Error fetching Prefix at ID ${id}  :`, err);
    throw err;
  } finally {
    client.release();
  }
};

// Get Prefix by Name. Only returns prefix where isDelete is false.
const getPrefixByName = async (data) => {
  const client = await postgres.connect();
  const { name } = data;
  try {
    result = await client.query('SELECT * FROM prefix WHERE name = $1;', [name]);
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (err) {
    console.error(`Error fetching Prefix at Name ${name} :`, err);
    throw err;
  } finally {
    client.release();
  }
};

// Check if Prefix Name is Duplicate.
const CheckPrefixName = async (data) => {
  const client = await postgres.connect();
  const { name } = data;
  try {
    const result = await client.query(
      'SELECT * FROM prefix WHERE name = $1;',
      [name]
    );
    return result.rows.length > 0;
  } catch (err) { 
    console.error('Error checking Prefix name : ', err);
    throw err;
  } finally {
    client.release();
  }
};

// Create new Prefix record.
const createPrefix = async (data) => {
  const { name } = data;
  const client = await postgres.connect();
  try {
    result = await client.query(
      `INSERT INTO prefix (name) VALUES ($1) RETURNING *;`, [name]
    );
    return result.rows;
  } catch (err) {
    console.error(`Error creating new Prefix at name ${name} :`, err);
    throw err;
  } finally {
    client.release();
  }
};

// Update Prefix record.
const updatePrefix = async (id, data) => {
  const { name } = data;
  const client = await postgres.connect();
  try {
    const result = await client.query(
      `UPDATE prefix SET name = $1 WHERE id = $2 RETURNING *;`, [name, id]
    );
    return result.rows.length > 0 ? result.rows : 'Prefix not found';
  } catch (err) {
    console.error(`Error updating Prefix at ID ${id} :`, err);
    throw err;
  } finally {
    client.release();
  }
};


// Force Delete Prefix record.
const DeletePrefix = async (id) => {
  const client = await postgres.connect();
  try {
    const result = await client.query(
      `DELETE FROM prefix WHERE id = $1 RETURNING *;`, [id]
    );
    return result.rows.length > 0 ? result.rows[0] : 'Prefix not found';
  } catch (err) {
    console.error(`Error deleting Prefix at ID ${id} :`, err);
    throw err;
  } finally {
    client.release();
  }
};

export default {
  getAllPrefix,
  getPrefixById,
  getPrefixByName,
  CheckPrefixName,
  createPrefix,
  updatePrefix,
  DeletePrefix,
};
