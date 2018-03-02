const express = require('express');
const app = express();
const morgan = require('morgan');

app.get("/", (req, res) => res.end('this is the response'));

app.use(morgan('combined'));

app.listen(3000, () => console.log('Listening on port 3000'));
