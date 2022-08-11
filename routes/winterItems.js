const express = require("express");
const router = express.Router();
const fs = require('fs');
const { v4: uuid } = require('uuid');

const readWinterItems = () => {
    const parsedWinterItems = JSON.parse(fs.readFileSync('./data/winterItems.json'));
    return parsedWinterItems;
};

router.get('/winter-items', (req, res) => {
    const winterItems = readWinterItems();

    res.status(200).json(winterItems);
});

module.exports = router;