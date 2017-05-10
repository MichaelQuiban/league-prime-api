const express = require('express');
const router = express.Router();
const app = require('./server.js')

const bodyParser = require('body-parser');

const {Champion} = require('./models');

router.get('/', (req, res) => {
    res.json(Champion.get());
});


module.exports = router;
