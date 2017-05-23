const express = require('express');
const router = express.Router();
const app = require('./server.js')

const bodyParser = require('body-parser').json();

const {Users} = require('./models');

router.use(bodyParser);

router.get('/', (req, res) => {
    res.json(Users.get());
});

module.exports = router;
