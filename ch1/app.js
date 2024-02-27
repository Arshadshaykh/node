const http=require('http');
const fs=require('fs');

const server= http.createServer((req,res)=>{
    const pathName = req.url;
    const method=req.method
    if (pathName==='/') {
        res.write('<html>');
        res.write('<head><title>passing request</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form></body>');
        res.write('</html>');
        return res.end;
    }
    if (pathName==='/message' && method==='POST') {
        const body=[];
        req.on('data',(chunk)=>{
            console.log(chunk);
            body.push(chunk);
        })
        req.on('end',()=>{
            const parsedBody=Buffer.concat(body).toString();
            const message=parsedBody.split('=')[1];
            console.log(parsedBody);
            fs.writeFileSync('message.txt',message);
        })
        // res.statusCode= 302;  
        res.writeHead(404,"Location","/");
        return res.end;

        // res.write('<html>');
        // res.write('<head><title>passing request</title></head>');
        // res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form></body>');
        // res.write('</html>');
        // return res.end;
    }
})
server.listen(5000,'127.0.0.1',()=>{
console.log('server started on post:3000')
})