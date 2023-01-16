const express = require('express');
const serverless = require('serverless-http');
const fs = require('fs');
const app = express();
const router = express.Router();

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

module.exports = app;
module.exports.handler = serverless(app);
