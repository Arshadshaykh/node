
const http = require('http');
const url = require('url');
const fs = require('fs');
const { error } = require('console');
const { type } = require('os');

const data=fs.readFileSync(`${__dirname}/userData/data.json`, 'utf-8',);
const userDataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;
    if (pathName === '/' || pathName === '/overview') {
        res.end('this is overview!');
    }
    else if (pathName === '/hello') {
        res.end('Hello there what are you doing!');
    } else if (pathName === '/api') {
        res.writeHead(200,{'content-type': 'application/json'})
        res.end(data);
    } else {
        res.writeHead(404, {'content-type': 'text/html'
        })
        res.end('<h1>OH no</h1>',);
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('server is runnig on port 8000');
})