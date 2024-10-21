const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Postgre connection
const pool = new Pool({
user : 'G' ,
host : 'localhost',
database : 'login',
password : '1234',
port : 5432,
});

// Middleware for session-based authentication (simple example)
const session = require('express-session');

app.use(session({
secret : 'your_secret_key',
resave: false,
saveUninitialized : true,
}));

// Simulated login route
app.post('/login', async (req, res) => {
const { username, password } = req.body;
const userQuery = await pool.query('SELECT * FROM users WHERE username = $1',
[username]);

if (userQuery.rows.length > 0) {
const user = userQuery.rows[0];
const isMatch = await bcrypt.compare(password, user.password_hash);

if (isMatch) {
req.session.userId = user.user_id;
res.redirect('/');
} else {
res.send('Invalid username or password');
}
} else {
res.send('Invalid username or password');
}
});

// Home route
app.get('/', async (req, res) => {
if (!req.session.userId) {

return res.send('Please login first');
}

const userId = req.session.userId;

// Query to get user permissions
const userPermissionsQuery = `
SELECT r.resource_name, p.permission_name
FROM acl a
JOIN resources r ON a.resource_id = r.resource_id
JOIN permissions p ON a.permission_id = p.permission_id
WHERE a.user_id = $1;
`;

const permissions = await pool.query(userPermissionsQuery, [userId]);

// Render page with user permissions
res.render('index', { permissions: permissions.rows });
});

// Logout route
app.get('/logout', (req, res) => {
req.session.destroy();
res.redirect('/');
});

app.listen(3000, () => {
console.log('Server is running on http//localhost3000');
});