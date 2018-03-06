const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const uuid = require('uuid/v1');
const methodOverride = require('method-override');
const mongoose = require('mongoose');


require('dotenv').config({ path: './variables.env' });
mongoose.connect(process.env.DATABASE);

const Schema = mongoose.Schema;
const blogSchema = new Schema({
  author: String,
  title: String,
  body: String,
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);


app.set('views', 'views');
app.set('view engine', 'pug');

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'styles')));
app.use(methodOverride('_method'));
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

// Routes

// Index
app.get("/", (req, res) => {
  // const blogArray = JSON.parse(fs.readFileSync('./seeds/blogs.json',
  //                                               'utf-8'));
  // res.render('index', {blogs: blogArray});

  Blog.find((err, blogCollection) => {
    if (err) {
      res.status(404).end('something went wrong');
    } else {
      res.render('index', {
        blogs: blogCollection
      });
    }
  });
});


// New
app.get("/new", (req, res) => {
  res.render('new');
});


// Show
app.get("/:blogId", (req, res) => {
  // const blogArray = JSON.parse(fs.readFileSync('./seeds/blogs.json',
  //                                               'utf-8'));
  // let foundBlog;
  //
  // blogArray.forEach(blog => {
  //   if (blog._id === req.params.blogId) {
  //     foundBlog = blog;
  //   }
  // });
  //
  // res.render('show', {blog: foundBlog});

  Blog.findById(req.params.blogId, (err, blog) => {
   if (err) {
     res.status(404).end('Blog not found');
   } else {
     res.render('show', { blog });
   }
  });
});


// Edit
app.get("/:blogId/edit", (req, res) => {
  // const blogArray = JSON.parse(fs.readFileSync('./seeds/blogs.json',
  //                                               'utf-8'));
  // let foundBlog;
  //
  // blogArray.forEach(blog => {
  //   if (blog._id === req.params.blogId) {
  //     foundBlog = blog;
  //   }
  // });
  //
  // res.render('edit', {blog: foundBlog});

  Blog.findById(req.params.blogId, (err, blog) => {
   if (err) {
     res.status(404).end('Blog not found');
   } else {
     res.render('edit', { blog });
   }
  });
});

// Post
app.post('/', urlencodedParser, (req, res) => {
  // const blogArray = JSON.parse(fs.readFileSync('./seeds/blogs.json',
                                                // 'utf-8'));

  Blog.create(
    {
    author: req.body.author || 'anon',
    title: req.body.title || 'blog title',
    body: req.body.blog_body || 'blog body',
    updatedAt: Date.now(),
    createdAt: Date.now()
    },
    (err, blog) => {
        if (err) {
          res.status(404).end('something went wrong');
        } else {
          res.redirect(303, '/');
        }
      }
  );

  // blogArray.push(newBlog);

  // fs.writeFileSync('./seeds/blogs.json',
  //   JSON.stringify(blogArray, null, 2));
  //
  // res.redirect(303, '/');


});

// Delete
app.delete('/:blogId', (req, res) => {
  // const blogArray = JSON.parse(fs.readFileSync('./seeds/blogs.json',
  //                                               'utf-8'));
  // const newBlogArray = blogArray.filter(blog => blog._id !== req.params.blogId);
  //
  // fs.writeFileSync('./seeds/blogs.json', JSON.stringify(newBlogArray,
  //                                                       null, 2));

  Blog.deleteOne({ _id: req.params.blogId }, () => {
    res.redirect(303, '/');
  });

});


// Put
app.put('/:blogId', urlencodedParser, (req, res) => {

  // const blogArray = JSON.parse(fs.readFileSync('./seeds/blogs.json',
  //                                               'utf-8'));
  // let blog, blogIdx;
  // for (let i = 0; i < blogArray.length; i++) {
  //   if (blogArray[i]._id === req.params.blogId) {
  //     blog = blogArray[i];
  //     blogIdx = i;
  //     break;
  //   }
  // }
  // if (blog !== undefined) {
  //   const { author, title, blog_body: body } = req.body;
  //   const updatedBlog = Object.assign({}, blog, {
  //     author,
  //     title,
  //     body,
  //     updatedAt: Date.now()
  //   });
  //   blogArray[blogIdx] = updatedBlog;
  //   fs.writeFileSync('./seeds/blogs.json', JSON.stringify(blogArray,
  //                                                         null, 2));
  //   res.redirect(303, '/');
  // } else {
  //   res.status(404).end('Blog Not Found');
  // }

  const { author, title, blog_body: body } = req.body;
  Blog.findByIdAndUpdate(
    req.params.blogId,
    { author, title, body, updatedAt: Date.now() },
    err => {
      if (err) {
        res.status(404).end('Blog not found');
      } else {
        res.redirect(303, '/');
      }
    }
  );
});
