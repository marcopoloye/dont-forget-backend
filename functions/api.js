const express = require('express');
const serverless = require('serverless-http');
const fs = require('fs');
const app = express();

const router = express.Router();

router.get('/test', (req, res) => {
    res.json({
        'test': 'test'
    });
})

router.get('/fallitems', (req, res) => {
    const fallItems = readFallItems();

    res.status(200).json(fallItems);
});

router.get('/springitems', (req, res) => {
    const springItems = readSpringItems();

    res.status(200).json(springItems);
});

router.get('/summeritems', (req, res) => {
    const summerItems = readSummerItems();

    res.status(200).json(summerItems);
});

router.get('/winteritems', (req, res) => {
    const winterItems = readWinterItems();

    res.status(200).json(winterItems);
});

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


app.use('/.netlify/functions/api', router);

module.exports = app;
module.exports.handler = serverless(app);
