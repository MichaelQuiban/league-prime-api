const express = require('express');
const jsonParser = require('body-parser').json();
const router = express.Router();

router.get('/', (req, res) = > {
	res.json(Champion.get());
}

module.exports = {router};
