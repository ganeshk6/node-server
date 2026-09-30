const http = require('http')
const PORT = 3000

const server = http.createServer((req, res)=>{
    res.setHeader('Content-Type', 'text/html');
    if(req.url == '/'){
        res.end("Hello World");
    }else if(req.url == "/pizza"){
        res.end("This is your pizza");
    }else if(req.url == "/home"){
        res.end("Welcome home");
    }else if(req.url == "/about"){
        res.end("Welcome yo About us");
    }else {

        res.statusCode = 404;
        res.end("Page Not Found");

    }
})

server.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})