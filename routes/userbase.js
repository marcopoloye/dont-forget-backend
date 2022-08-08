const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const knex = require('knex')(require('../knexfile'));

router.post('/register', (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    
    const newUser = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
    }

    knex('users')
        .insert(newUser)
        .then(() => {
            res.status(201).send('registered successfully');
        })
        .catch((err) => {
            res.status(400).send('registration failed');
        });

});

router.post('/login', (req, res) => {

})

module.exports = router;