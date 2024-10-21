import postgres from '../utils/db.js';

let result = '';

const getAllSec = async () => {
    const client = await postgres.connect();
    try {
        result = await client.query('SELECT * FROM section ;');
        return result.rows;
    } catch (err) {
        console.error('Error fetching all sections :', err);
        throw err;
    } finally {
        client.release();
    }
};

const getSecById = async (id) => {
    const client = await postgres.connect();
    try {
        result = await client.query('SELECT * FROM section WHERE id = $1;', [id]);
        console.log(result);
        return result.rows;
    } catch (err) {
        console.error(`Error fetching section at ID ${id} :`, err);
        throw err;
    } finally {
        client.release();
    }
};

const getSecByName = async (data) => {
    const client = await postgres.connect();
    const { name } = data;
    try {
        result = await client.query('SELECT * FROM section WHERE section = $1 ;', [name]);
        return result.rows.length > 0 ? result.rows[0] : null;
    } catch (err) {
        console.error(`Error fetching section at name ${name}:`, err);
        throw err;
    } finally {
        client.release();
    }
};

const checkSec = async (data) => {
    const client = await postgres.connect();
    const { name } = data;
    try {
        const result = await client.query(
            'SELECT * FROM section WHERE section = $1',
            [name]
        );
        return result.rows.length > 0;
    } catch (err) {
        console.error('Error checking Section :', err);
        throw err;
    } finally {
        client.release();
    }
};

const createSec = async (data) => {
    const { name } = data;
    const client = await postgres.connect();

    try {
        const result = await client.query(
            `INSERT INTO section (section)
             VALUES ($1)
             RETURNING *;`,
            [name]
        );
        return result.rows;
    } catch (err) {
        console.error(`Error creating new Section at ${name} :`, err);
        throw err;
    } finally {
        client.release();
    }
};

const updateSec = async (id, data) => {
    const { section } = data;
    const client = await postgres.connect();
    try {
        const result = await client.query(
            `UPDATE section
             SET section = $1
             WHERE id = $2
             RETURNING *;`,
            [section, id]
        );
        return result.rows.length > 0 ? result.rows : 'Section not found';
    } catch (err) {
        console.error(`Error updating Section at ID ${id}:`, err);
        throw err;
    } finally {
        client.release();
    }
};

const deleteSec = async (id) => {
    const client = await postgres.connect();
    try {
        const result = await client.query(
            `DELETE FROM section WHERE id = $1 RETURNING *;`, [id]
        );
        return result.rows.length > 0 ? result.rows[0] : 'Section not found';
    } catch (err) {
        console.error(`Error deleting Section at ID ${id}:`, err);
        throw err;
    } finally {
        client.release();
    }
};

export default {
    getAllSec,
    getSecById,
    createSec,
    updateSec,
    getSecByName,
    checkSec,
    deleteSec
};