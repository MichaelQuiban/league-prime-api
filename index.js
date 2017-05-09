const {User} = require('./models');
const {Champion} = require('./championRouter');
const {Router} = require('./userRouter');


module.exports = {User, Champion, Router};