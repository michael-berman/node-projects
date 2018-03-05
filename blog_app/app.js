const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

require('dotenv').config({ path: './variables.env' });

app.set('views', 'views');
app.set('view engine', 'pug');

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'styles')));
app.use(methodOverride('_method'));
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

// Temporary blog array

// Routes

// Index
app.get("/", (req, res) => {
  const blogArray = JSON.parse(fs.readFileSync('./seeds/blogs.json', 'utf-8'));
  res.render('index', {blogs: blogArray});
});

// New
app.get("/new", (req, res) => {
  res.render('new');
});


// Show
app.get("/:blogId", (req, res) => {
  const blogArray = JSON.parse(fs.readFileSync('./seeds/blogs.json', 'utf-8'));
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
  const blogArray = JSON.parse(fs.readFileSync('./seeds/blogs.json', 'utf-8'));
  let foundBlog;

  blogArray.forEach(blog => {
    if (blog._id === req.params.blogId) {
      foundBlog = blog;
    }
  });

  res.render('edit', {blog: foundBlog});
});

// Post
app.post('/', urlencodedParser, (req, res) => {
  const blogArray = JSON.parse(fs.readFileSync('./seeds/blogs.json', 'utf-8'));

  const newBlog = {
    author: req.body.author || 'Mike',
    title: req.body.title || 'BLOG TITLE',
    _id: Math.floor(Math.random(10000)),
    body: req.body.blog_body || 'Just blog things',
    updatedAt: Date.now(),
    createdAt: Date.now()
  };

  blogArray.push(newBlog);

  fs.writeFileSync('./seeds/blogs.json', JSON.stringify(blogArray, null, 2));

  res.redirect(303, '/');
});

// Delete
app.delete('/:blogId', (req, res) => {
  const blogArray = JSON.parse(fs.readFileSync('./seeds/blogs.json', 'utf-8'));
  const newBlogArray = blogArray.filter(blog => blog._id !== req.params.blogId);

  fs.writeFileSync('./seeds/blogs.json', JSON.stringify(newBlogArray, null, 2));

  res.redirect(303, '/');
});


// Put
app.put('/:blogId', urlencodedParser, (req, res) => {

  const blogArray = JSON.parse(fs.readFileSync('./seeds/blogs.json', 'utf-8'));
  let blog, blogIdx;
  for (let i = 0; i < blogArray.length; i++) {
    if (blogArray[i]._id === req.params.blogId) {
      blog = blogArray[i];
      blogIdx = i;
      break;
    }
  }
  if (blog !== undefined) {
    const { author, title, blog_body: body } = req.body;
    const updatedBlog = Object.assign({}, blog, {
      author,
      title,
      body,
      updatedAt: Date.now()
    });
    blogArray[blogIdx] = updatedBlog;
    fs.writeFileSync('./seeds/blogs.json', JSON.stringify(blogArray, null, 2));
    res.redirect(303, '/');
  } else {
    res.status(404).end('Blog Not Found');
  }
});
