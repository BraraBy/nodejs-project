const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static folder to serve HTML
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/users', usersRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});