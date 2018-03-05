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

// Index
app.get("/", (req, res) => {
  res.render('index', {blogs: blogArray});
});

// New
app.get("/new", (req, res) => {
  res.render('new');
});


// Show
app.get("/:blogId", (req, res) => {
  let foundBlog;

  blogArray.forEach(blog => {
    if (blog._id === req.params.blogId) {
      foundBlog = blog;
    }
  });

  res.render('show', {blog: foundBlog});
});


// Edit
app.get("/:blogId/edit", (req, res) => {
  let foundBlog;

  blogArray.forEach(blog => {
    if (blog._id === req.params.blogId) {
      foundBlog = blog;
    }
  });

  res.render('edit', {blog: foundBlog});
});
