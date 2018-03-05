const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
require('dotenv').config({ path: './variables.env' });

app.set('views', 'views');
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'styles')));

app.get("/", (req, res) => {
  res.render('index', {blogs: []});
});

app.use(morgan('combined'));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
