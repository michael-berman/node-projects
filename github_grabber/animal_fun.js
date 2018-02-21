const fs = require('fs');
const http = require('http');

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
  res.write('hello world');
  res.end();
})

server.listen(8000, () => console.log("I'm listening on port 8000!"));
