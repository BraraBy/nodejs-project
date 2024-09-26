const client = require('./db');

const insertUser = async () => {
try {
const res = await client.query(
'INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *',
['Jay Dury', 'jay.Du@example.com', 25]
);
console.log('User inserted:', res.rows[0]);
} catch (err) {
console.error('Error inserting user:', err);
} finally {
client.end();
}
};
insertUser();