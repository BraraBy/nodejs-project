const { Pool } = require('pg');

// ตั้งค่าการเชื่อมต่อกับฐานข้อมูล PostgreSQL
const pool = new Pool({
user: 'G',
host: 'localhost',
database: 'try_usingdb',
password: '1234',
port: 5432,
});

module.exports = pool;

