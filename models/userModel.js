const mongoose = require('mongoose');

const URI = (process.env.BD || 'mongodb://localhost:27017/auth-jwt-express')

mongoose.connect(URI, {useNewUrlParser: true, useFindAndModify: false });

const usersModel = mongoose.model('users', {
    firstname: String,
    lastname: String,
    email: String,
    username: String,
    password: String
});

module.exports = usersModel
