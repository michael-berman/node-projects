const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv').config({ path: './variables.env' });

app.get("/", (req, res) => res.end('this is the response'));

app.use(morgan('combined'));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
