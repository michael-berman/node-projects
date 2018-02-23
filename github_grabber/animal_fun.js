const fs = require('fs');
const http = require('http');
const qs = require('querystring');
const cache = {};

// fs.readFile('./animals.txt', 'utf-8', (err, data) => {
//   if (err) {
//     console.log(err);
//     return
//   }
//   let animals = data.split("\n");
//   let animalsSelected = [];
//   animals.forEach( animal => {
//     if (animal[0] === process.argv[2].toUpperCase()) {
//       animalsSelected.push(animal);
//     }
//   })
//
//   fs.writeFile(`./${process.argv[2]}_animals.txt`, animalsSelected.join("\n"), err => {
//     if (err) {
//       console.log(err);
//       return
//     }
//     console.log(`${process.argv[2]}_animals successfully written!`);
//   })
// })

const server = http.createServer((req, res) => {
  const query = req.url.split("?")[1];

  if (query !== undefined) {

    const parsedLetter = Object.keys(qs.parse(query))[0].toUpperCase();

    if (cache[parsedLetter] !== undefined) {
      res.end(`${cache[parsedLetter]}`);
    }

    if (parsedLetter !== undefined) {

      fs.readFile('./animals.txt', 'utf-8', (err, data) => {

        if (err) {
          console.log(err);
          res.end('It failed');
          return
        }

        let animals = data.split("\n");
        let animalsSelected = [];
        animals.forEach( animal => {
          if (animal[0] === parsedLetter) {
            animalsSelected.push(animal);
          }
        })

        cache[parsedLetter] = animalsSelected;


      })
    }

    res.end(`${cache[parsedLetter]}`);

  }

})

server.listen(8000, () => console.log("I'm listening on port 8000!"));
