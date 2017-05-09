const express = require('express');
const router = express.Router();
const app = require('./server.js')

const bodyParser  require('body-parser');
const jsonParser = ('body-parser').json();

const {Champion} = require('./models');

router.get('/', (req, res) = > {
	res.json(Champion.get());
}

router.post('')
module.exports = {router};
