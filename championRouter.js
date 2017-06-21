const express = require('express');
const router = express.Router();
const app = require('./server.js')

const bodyParser = require('body-parser').json();

const {Champion} = require('./models');

router.use(bodyParser);

router.get('/', (req, res) => {
    res.json(Champion.get());
});

module.exports = {app, router};
