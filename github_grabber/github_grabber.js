const fs = require('fs');
const qs = require('querystring');
const http = require('http');
const https = require('https');

const githubServer = http.createServer((req, res) => {
  if (req.method === 'POST') {
    res.end("I'm a POST request!");

    let body = '';

    req.on('data', bufferData => {
      body += bufferData;

      if (body.length > 1e6) {
        req.connection.destroy();
      }
    })

    req.on('end', () => {
      const username = qs.parse(body).username;
      res.end(username);
    })

  }
  res.end("Danger, not a POST request!");
})

githubServer.listen(8080, () => console.log('Listening on 8080'));
