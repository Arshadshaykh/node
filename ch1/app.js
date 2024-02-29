const http=require('http');

const routes=require('./routes');

const server= http.createServer(routes);

server.listen(5000,'127.0.0.1',()=>{
console.log('Server Started on 127.0.0.1:5000')
})