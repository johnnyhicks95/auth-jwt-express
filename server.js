const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config()

const PORT = (process.env.PORT || 8080)
const app = express();
const server = require('http').Server(app);

app.use(cors());
app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'views')));

const authController = require('./controllers/authController');

app.use('/auth', authController);

server.listen(PORT, () => {
    console.log(`Server online in ${PORT}`)
});