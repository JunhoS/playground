const express = require('express');
const path = require('path');
const app = express();

const indexRouter = require('./route.js');
require('./db/mongo.js');

app.use(express.static(path.join(__dirname, 'views')));

require('./loginModule/loginModule.js');

app.use('/', indexRouter);

app.listen(8080, () => {
  console.log('Express App on port 8080!');
});