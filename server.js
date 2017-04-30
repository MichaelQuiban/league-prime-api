const express = require('express');
const mongoose = require ('mongoose'); //https://www.npmjs.com/package/mongoose
const morgan = require('morgan')
const parser = require('body-parser')
app.use(express.static('public')); //Fix for issues with express
const {championData} = require('./models');

//Database URL's
const {DATABASE_URL, PORT} = require('./config');

const app = express();

app.use(morgan('common')); //https://www.npmjs.com/package/morgan || Standard Apache common log output.
app.use(parser.json());//https://github.com/expressjs/body-parser || Body parsing middleware.
app.use(parser.urlencoded({
  extended: true
}));

//Static server for API
app.use(express.static('public'));

//Mongoose' internal promise-like object.
mongoose.Promise = global.Promise;

let server;


app.get("/server", (req, res) => {
  res.status(200).send("Hello world!");
});

//User retrieves information
app.get("/champion-info", (req, res) => {
  championData
  .find()
  .exec()
  .then(championInfo)
});


app.listen(process.env.PORT || 8080, function() {
  consle.log('Server is currently running @ localhost:8080');
});


if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app};