const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: './variables.env' });

app.set('views', 'views');
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'styles')));


app.use(morgan('combined'));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

// Temporary blog array

const blogFile = fs.readFileSync('./seeds/blogs.json', 'utf-8');
const blogArray = JSON.parse(blogFile);

// Routes
app.get("/", (req, res) => {
  console.log(blogArray);
  res.render('index', {blogs: blogArray});
});
