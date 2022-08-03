const express = require("express");
const app = express();
const cors = require('cors');
const summerItems = require('./routes/summerItems');
const winterItems = require('./routes/winterItems');

app.use(express.json());
app.use(cors());

app.use('/', summerItems);
app.use('/', winterItems)

app.listen(8080, () => {
    console.log(`server is running!`);
});