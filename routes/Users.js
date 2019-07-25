const express = require("express");
const users = express.Router();
const cors = require('cors');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const User = require("../models/User");
users.use(cors());

process.env.SECRET_KEY = 'secretKey';

users.post('/register', (req, res) => {
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        address: req.body.address,
        email: req.body.email,
        password: req.body.password
    };

    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash;
                    User.create(userData)
                        .then(user => {
                            res.json({ status: user.email + ' registered' })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {
                res.status(400).json({ error: "User already exists" })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
});

users.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, hash) => {
                    if (hash) {
                        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 1440
                        });
                        res.send(token)
                    } else {
                        res.status(400).json({ error: 'Password is incorrect' })
                    }
                })
            } else {
                res.status(400).json({ error: 'User does not exist' })
            }
        })
        .catch(err => {
            res.status(400).json({ error: err })
        })
});

users.post('/update', (req, res) => {
    const user = req.body.user;
    User.update({
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        address: user.address,
        email: user.email},
        {
            where: {
                id_user: user.id_user
            }
        })
        .then(result => {
            let token = jwt.sign(user, process.env.SECRET_KEY, {
                expiresIn: 1440
            });
            res.send(token)
        })
        .catch(err => {
            res.status(400).json({ error: err })
        })
});

module.exports = users;