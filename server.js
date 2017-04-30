const express = require('express');
const mongoose = require ('mongoose'); //https://www.npmjs.com/package/mongoose
const morgan = require('morgan')
const parser = require('body-parser') 
const {championData} = require('./models');

//Database URL's
const {DATABASE_URL, PORT} = require('./config');

const app = express();
app.use(express.static('public'))

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
let users = [];

app.get("/users/", (req, res) => {
  users.push(req.params.username);
  users.push(req.params.password);
});

//User retrieves information
app.get("/champion-info", (req, res) => {
  championData
  .find()
  .exec()
  .then(championInfo)
});


/* app.listen(process.env.PORT || 8080, function() {
  console.log('Server is currently running @ localhost:8080');
}); */

function runServer(database_url = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(database_url, err => { //Launch database
      if (err) { //If error, throw error message.
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app};