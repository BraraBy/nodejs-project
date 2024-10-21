import postgres from '../utils/db.js';

let result = '';

const getAllStd = async () => {
  const client = await postgres.connect();
  try {
    result = await client.query('SELECT * FROM student;');
    return result.rows;
  } catch (err) {
    console.error('Error to get all Students :', err);
    throw err;
  } finally {
    client.release();
  }
};

const getStdById = async (id) => {
  const client = await postgres.connect();
  try {
    result = await client.query('SELECT * FROM student WHERE id = $1;', [id]);
    return result.rows;
  } catch (err) {
    console.error(`Error to get Student ID ${id}:`, err);
    throw err;
  } finally {
    client.release();
  }
};

// Get Prefix by Name. Only returns prefix where isDelete is false.
const getStdByName = async (data) => {
  const client = await postgres.connect();
  const { name } = data;
  try {
    result = await client.query('SELECT * FROM student WHERE name = $1;', [name]);
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (err) {
    console.error(`Error to get Student name ${name}:`, err);
    throw err;
  } finally {
    client.release();
  }
};

const checkStdName = async (data) => {
  const client = await postgres.connect();
  const { name } = data;
  try {
    const result = await client.query(
      'SELECT * FROM student WHERE id = $1 ;',
      [name]
    );
    return result.rows.length > 0;
  } catch (err) {
    console.error('Error checking for duplicate student name:', err);
    throw err;
  } finally {
    client.release();
  }
};

// Create new Prefix record.
// Create new Student
const createStd = async (data) => {
    const { id, prefix_id, first_name, last_name, date_of_birth, sex, curriculum_id, previous_school, address, telephone, email, line_id, status } = data;
    const client = await postgres.connect();
    try {
      const result = await client.query(
          `INSERT INTO student ( id, prefix_id, first_name, last_name, date_of_birth, sex, curriculum_id, previous_school, address, telephone, email, line_id, status)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
               RETURNING *;`,
          [id,prefix_id, first_name, last_name, date_of_birth, sex, curriculum_id, previous_school, address, telephone, email, line_id, status]
      );
      return result.rows;
    } catch (err) {
      console.error('Error creating new Student:', err);
      throw err;
    } finally {
      client.release();
    }
  };

// Update Student
const updateStd = async (id, data) => {
    const { prefix_id, first_name, last_name, date_of_birth, sex, curriculum_id, previous_school, address, telephone, email, line_id, status } = data;
    const client = await postgres.connect();
    try {
      const result = await client.query(
          `UPDATE student
               SET prefix_id = $1, first_name = $2, last_name = $3, date_of_birth = $4, sex = $5, curriculum_id = $6, previous_school = $7, address = $8, telephone = $9, email = $10, line_id = $11, status = $12
               WHERE id = $13 
               RETURNING *;`,
          [prefix_id, first_name, last_name, date_of_birth, sex, curriculum_id, previous_school, address, telephone, email, line_id, status, id]
      );
      return result.rows;
    } catch (err) {
      console.error(`Error updating Student at ID ${id}:`, err);
      throw err;
    } finally {
      client.release();
    }
  };


// Force Delete Prefix record.
const deleteStd = async (id) => {
  const client = await postgres.connect();
  try {
    const result = await client.query(
      `DELETE FROM student WHERE id = $1 RETURNING *;`, [id]
    );
    return result.rows.length > 0 ? result.rows[0] : 'Not found';
  } catch (err) {
    console.error(`Error deleting Student at ID ${id}:`, err);
    throw err;
  } finally {
    client.release();
  }
};

export default {
  getAllStd,
  getStdById,
  getStdByName,
  checkStdName,
  createStd,
  updateStd,
  deleteStd
};
