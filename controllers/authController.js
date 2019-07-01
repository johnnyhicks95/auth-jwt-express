const express = require('express');
const router = express.Router();
const Cryptr = require('cryptr');
const userModel = require('../models/userModel');
const response = require('../utils/response');
const jwt = require('jsonwebtoken');

const registerVerify = require('../middlewares/verify/registerVerify');
const loginVerify = require('../middlewares/verify/loginVerify')

const cryptr = new Cryptr(process.env.KEY || 'privateAndTotalSecretKey');

router.post('/register', registerVerify, async (req, res) => {
    let data = {...req.body.data}
    data.password = cryptr.encrypt(data.password)

    const user = new userModel(data)
    const verify = await userModel.findOne({$or: [
        {email: data.email},
        {phone: data.username}
    ]})

    if (!verify) {
        const result = await user.save()
        res.status(201).json(response())
    } else {
        res.status(401).json(response('exist'))
    }
});

router.post('/login', loginVerify, async (req, res) => {
    const data = { ...req.body.data }
    let verify = false
    let login = await userModel.findOne({ 
        email: data.email
    })
    if (login) {
        const pass = cryptr.decrypt(login.password)
        if (data.password == pass) {
            verify = true
        }
        if (verify) {
            const token = jwt.sign({ 
                key: login._id 
            }, (process.env.TKEY || 'privateKey'));
            res.status(200).json(response('login', token))
        } else {
            res.status(403).json(response('no-login'))
        }
    } else {
        res.status(500).json(response('error'))
    }
});

module.exports = router