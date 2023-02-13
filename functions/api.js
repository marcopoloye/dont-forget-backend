const express = require('express');
const serverless = require('serverless-http');
const fs = require('fs');
const app = express();
const router = express.Router();
const knex = require('knex')(require('../database/knexfile'));
const request = require('request');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// require('dotenv').config();

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

const signup = () => {
    const newUser = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    };

    knex('newusers').insert(newUser)
    .then(() => {
        res.header('Access-Control-Allow-Origin', '*');
        res.status(200).send('registered successfully');
    })
    .catch((err) => {
        res.status(400).send('registration failed');
    });
}
// user sign up
router.post('/register', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    request(
        { url: 'https://dontforgetapi.netlify.app/register' },
        (error, response, body) => {
            if (error) {
                return res.status(400)
            }
            signup()
        }

    )
    // const hashedPassword = bcrypt.hashSync(req.body.password, 10);

});

// // user login
// router.post('/login', (req, res) => {

//     knex('newusers').where({email: req.body.email})
//         .first()
//         .then((user) => {
//             const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

//             if (!isPasswordCorrect) {
//                 return res.status(400).send("Invalid password");
//             };

//             const token = jwt.sign(
//                 { id: user.id, email: user.email },
//                 process.env.JWT_SECRET,
//                 { expiresIn: "24h" }
//             );

//             res.json({token});
//         })
//         .catch(() => {
//             res.status(400).send("Invalid credentials");
//         });
// });

// // saves list to current user
// router.post('/savelist', (req, res) => {

//     const list = {
//         lists: JSON.stringify(req.body.lists)
//     };

//     knex('newusers').where({email: req.body.email})
//         .update(list)
//         .then(() => {
//             res.status(201).send('list updated');
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(400).send('failed to add list');
//         });
// });

// // delete user account
// router.delete('/deleteuser', (req, res) => {

//     knex('newusers').where({email: req.body.email})
//         .del()
//         .then(() => {
//             res.status(201).send('list updated');
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(400).send('failed to add list');
//         });
// })

// // checks for existing user
// router.get('/current', (req, res) => {
//     if (!req.headers.authorization) return res.status(401).send("Please login");

//     const authToken = req.headers.authorization.split(" ")[1];

//     jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//           return res.status(401).send("Invalid auth token");
//         };
    
//         knex('newusers').where({ email: decoded.email })
//             .first()
//             .then((user) => {
//                 delete user.password;
//                 res.json(user);
//             });
//     });
// });

module.exports = app;
module.exports.handler = serverless(app);
