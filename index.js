const express = require("express");
const app = express();
const cors = require('cors');
const summerItems = require('./routes/summerItems');
const winterItems = require('./routes/winterItems');
const fallItems = require('./routes/fallItems');
const springItems = require('./routes/springItems');
const userbase = require('./routes/userbase');

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use('/', summerItems, winterItems, fallItems, springItems, userbase);


app.listen(PORT, () => {
    console.log(`server is running! @ ${PORT}`);
});