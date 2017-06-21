const parser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const {User,Champion} = require('./models');
const {router: userRouter} = require('./userRouter');
const {router: championRouter} = require('./championRouter');

//Database URL's
const {DATABASE_URL, PORT} = require('./config');

const app = express();
app.use(express.static('public'));

app.use('/users', userRouter);
app.use('/champion', championRouter);


app.use(morgan('common')); //https://www.npmjs.com/package/morgan || Standard Apache common log output.
app.use(parser.json());//https://github.com/expressjs/body-parser || Body parsing middleware.
app.use(parser.urlencoded({
  extended: true
}));

//Static server for API
app.use(express.static('public'));

//Mongoose' internal promise-like object.
mongoose.Promise = global.Promise;


app.use('*', function(res, res){
  return res.status(404).json({message: 'Not Found'});4
});

let server;

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

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};