const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
require('dotenv').config({ path: './variables.env' });

app.set('views', 'views');
app.set('view engine', 'pug');

app.get("/", (req, res) => {
  res.render('hello.pug', {header: "hello all"});
});

app.use(morgan('combined'));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
