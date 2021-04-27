/*
const http = require('http')
const fs = require('fs')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World!\n')
})

// fs.readFile("index.html", function(err, data){
//     response.writeHead(200, {'Content-Type': 'text/html'});
//     response.write(data);
//     response.end();
//     index = data
// });

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
*/


var indexdata;
fs = require('fs')
fs.readFile('index.html', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  indexdata = data
  console.log(data);
});


const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send(indexdata)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})