const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const knex = require('knex')(require('../knexfile'));
require('dotenv').config();

router.post('/register', (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    
    const newUser = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
    };

    knex('users2').insert(newUser)
        .then(() => {
            res.status(201).send('registered successfully');
        })
        .catch((err) => {
            res.status(400).send('registration failed');
        });

});

router.post('/login', (req, res) => {

    knex('users2').where({email: req.body.email})
        .first()
        .then((user) => {
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

            if (!isPasswordCorrect) {
                return res.status(400).send("Invalid password");
            };

            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
            );

            res.json({token});
        })
        .catch(() => {
            res.status(400).send("Invalid credentials");
        });
});

router.post('/savelist', (req, res) => {

    const list = {
        lists: JSON.stringify(req.body.lists)
    };

    knex('users2').where({email: req.body.email})
        .update(list)
        .then(() => {
            res.status(201).send('list updated');
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send('failed to add list');
        });
});

router.get('/current', (req, res) => {
    if (!req.headers.authorization) return res.status(401).send("Please login");

    const authToken = req.headers.authorization.split(" ")[1];

    jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send("Invalid auth token");
        };
    
        knex("users2").where({ email: decoded.email })
            .first()
            .then((user) => {
                delete user.password;
                res.json(user);
            });
    });
});

module.exports = router;