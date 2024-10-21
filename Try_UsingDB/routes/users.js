const express = require('express');
const pool = require('../db');
const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');

}
});

// INSERT a new user
router.post('/add', async (req, res) => {
const { name, email } = req.body;
try {
const result = await pool.query(
'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
[name, email]
);
res.json(result.rows[0]);
} catch (err) {
console.error(err.message);
res.status(500).send('Server error');
}
});

// UPDATE a user
router.put('/update/:id', async (req, res) => {
const { id } = req.params;
const { name, email } = req.body;
try {
const result = await pool.query(
'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
[name, email, id]
);

res.json(result.rows[0]);
} catch (err) {
console.error(err.message);
res.status(500).send('Server error');
}
});

// DELETE a user
router.delete('/delete/:id', async (req, res) => {
const { id } = req.params;
try {
await pool.query('DELETE FROM users WHERE id = $1', [id]);
res.json({ message: 'User deleted' });
} catch (err) {
console.error(err.message);
res.status(500).send('Server error');
}
});

module.exports = router;