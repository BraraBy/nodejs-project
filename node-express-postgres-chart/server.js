const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();

// ตั้งค่า EJS เป็น view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// เสิร์ฟไฟล์ static
app.use(express.static(path.join(__dirname, 'public')));

// ตั้งค่าการเชื่อมต่อ PostgreSQL
const pool = new Pool({
user: 'G',
host: 'localhost',
database: 'graphdb',
password: '1234',

port: 5432,
});

// เส้นทางหลัก
app.get('/', async (req, res) => {
try {
const result = await pool.query('SELECT * FROM sales_data ORDER BY date');
const salesData = result.rows;

// ส่งข้อมูลไปยังหน้า index.ejs
res.render('index', { salesData });
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});