import postgres from '../utils/db.js';

let result = '';

const getAllCurr = async () => {
    const client = await postgres.connect();
    try {
        result = await client.query('SELECT * FROM curriculum');
        return result.rows;
    } catch (err) {
        console.error('Error fetching all Curriculums : ', err);
        throw err;
    } finally {
        client.release();
    }
};

const getCurrById = async (id) => {
    const client = await postgres.connect();
    try {
        result = await client.query('SELECT * FROM curriculum WHERE id = $1 ;', [id]);
        console.log(result);
        return result.rows;
    } catch (err) {
        console.error(`Error fetching Curriculum at ID ${id} :`, err);
        throw err;
    } finally {
        client.release();
    }
};

const getCurrByName = async (data,nameType) => {
    const client = await postgres.connect();
    const { name } = data;
    try {
        result = await client.query('SELECT * FROM curriculum WHERE $1 = $2 ;', [nameType,name]);
        return result.rows.length > 0 ? result.rows[0] : null;
    } catch (err) {
        console.error(`Error fetching Curriculum at Name ${name} :`, err);
        throw err;
    } finally {
        client.release();
    }
};

const createCurr = async (data) => {
    const { curr_name_th, curr_name_en, short_name_th, short_name_en } = data;
    const client = await postgres.connect();

    try {
        const result = await client.query(
            `INSERT INTO curriculum (curr_name_th, curr_name_en, short_name_th, short_name_en)
             VALUES ($1, $2, $3, $4)
             RETURNING *;`,
            [curr_name_th, curr_name_en, short_name_th, short_name_en]
        );
        return result.rows;
    } catch (err) {
        console.error(`Error creating new Curriculum : `, err);
        throw err;
    } finally {
        client.release();
    }
};

const updateCurr = async (id, data) => {
    const { curr_name_th, curr_name_en, short_name_th, short_name_en } = data;
    const client = await postgres.connect();
    try {
        const result = await client.query(
            `UPDATE curriculum
             SET curr_name_th = $1, curr_name_en = $2, short_name_th = $3, short_name_en = $4
             WHERE id = $5
             RETURNING *;`,
            [curr_name_th, curr_name_en, short_name_th, short_name_en, id]
        );
        return result.rows.length > 0 ? result.rows : 'Curriculum not found';
    } catch (err) {
        console.error(`Error updating Curriculum : `, err);
        throw err;
    } finally {
        client.release();
    }
};

const checkCurr = async (data, nameType, id= null) => {
    const client = await postgres.connect();
    try {
        let query;
        let values;

        if (id) {
            query = `SELECT * FROM curriculum WHERE ${nameType} = $1 AND id != $2`;
            values = [data, id];
        } else {
            query = `SELECT * FROM curriculum WHERE ${nameType} = $1`;
            values = [data];
        }

        const result = await client.query(query, values);

        return result.rows.length > 0;
    } catch (err) {
        console.error('Error checking Curriculum :', err);
        throw err;
    } finally {
        client.release();
    }
};

const deleteCurr = async (id) => {
    const client = await postgres.connect();
    try {
        const result = await client.query(
            `DELETE FROM curriculum WHERE id = $1 RETURNING *;`, [id]
        );
        return result.rows.length > 0 ? result.rows[0] : 'Curriculum not found';
    } catch (err) {
        console.error(`Error deleting Curriculum : `, err);
        throw err;
    } finally {
        client.release();
    }
};

export default {
    getAllCurr,
    getCurrById,
    getCurrByName,
    checkCurr,
    createCurr,
    updateCurr,
    deleteCurr
};