const express = require("express");
const router = express.Router();
const fs = require('fs');
const { v4: uuid } = require('uuid');

const readFallItems = () => {
    const parsedFallItems = JSON.parse(fs.readFileSync('./data/fallItems.json'));
    return parsedFallItems;
}

router.get('/fall-items', (req, res) => {
    const fallItems = readFallItems();

    res.status(200).json(fallItems);
})

module.exports = router;