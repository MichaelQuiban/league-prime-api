const express = require('express');
const mongoose = require ('mongoose');
const morgan = require('morgan')
const parser = require('body-parser')
app.use(express.static('public')); //Fix for issues with express

//Database URL's
const {DATABASE_URL, PORT} = require('./config');

const app = express();

app.use(morgan('common')); //https://www.npmjs.com/package/morgan || Standard Apache common log output.
app.use(parser.json());//https://github.com/expressjs/body-parser || Body parsing middleware.
app.use(parser.urlencoded({
  extended: true
}));

//Mongoose' internal promise-like object.
mongoose.Promise = global.Promise;


let server;

app.get("/server", (req, res) => {
  res.status(200).send("Hello world!");
});

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    }).on('error', err => {
      reject(err)
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};