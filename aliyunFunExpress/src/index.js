
const { Server } = require('@webserverless/fc-express')
const express = require('express');
const ejs = require('ejs');

const app = express();
app.engine('ejs', ejs.__express);
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/:name', (req, res) => {
  console.log('current parameter name: ' + req.params.name);
  res.render('hello', { name: req.params.name, debug: 'debug' });
});

app.all("*", (req, res) => {
  res.send('hello world!');
});

const server = new Server(app);

// http trigger entry
module.exports.handler = function(req, res, context) {
  server.httpProxy(req, res, context);
};

// api gateway entry
// module.exports.handler = function(event, context, callback) {
//   server.proxy(event, context, callback);
// };