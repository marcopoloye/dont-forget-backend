const express = require('express');
const serverless = require('serverless-http');
const fs = require('fs');
const app = express();
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const knex = require('knex')(require('../database/knexfile'));

app.use('/', router);

// read each json file
const readFallItems = () => {
    const parsedFallItems = JSON.parse(fs.readFileSync('./data/fallItems.json'));
    return parsedFallItems;
};

const readSpringItems = () => {
    const parsedSpringItems = JSON.parse(fs.readFileSync('./data/springItems.json'));
    return parsedSpringItems;
};

const readSummerItems = () => {
    const parsedSummerItems = JSON.parse(fs.readFileSync('./data/summerItems.json'));
    return parsedSummerItems;
};

const readWinterItems = () => {
    const parsedWinterItems = JSON.parse(fs.readFileSync('./data/winterItems.json'));
    return parsedWinterItems;
};

// route endpoints
router.get('/fallitems', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const fallItems = readFallItems();

    res.status(200).json(fallItems);
});

router.get('/springitems', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const springItems = readSpringItems();

    res.status(200).json(springItems);
});

router.get('/summeritems', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const summerItems = readSummerItems();

    res.status(200).json(summerItems);
});

router.get('/winteritems', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const winterItems = readWinterItems();

    res.status(200).json(winterItems);
});


// user sign up
router.post('/register', (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    
    const newUser = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
    };
})
module.exports = app;
module.exports.handler = serverless(app);
