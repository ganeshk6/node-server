const http = require('http')
const fs = require('fs')
const PORT = 3000

const server = http.createServer((req, res)=>{
    let url = req.url
    let method = req.method

    if(url == "/"){
        res.setHeader('Content-Type', 'text/html');
        res.end(
            `
                <form action="/message" method="POST">
                    <labe>Name:</labe>
                    <input type='text' name="username" />
                    <button type="submit">Add</button>
                </form>
            `
        )
    }else{
        if(url == '/message'){
            res.setHeader('Content-Type', 'text/html');
            let dataChunks = []
            req.on('data', (chunks)=>{
                // console.log(chunks)
                dataChunks.push(chunks)
            })
            req.on('end', ()=>{
                let combindBuffert = Buffer.concat(dataChunks)
                // console.log(combindBuffert.toString())
                let value = combindBuffert.toString().split("=")[1]
                fs.writeFile("formValues.txt", value, ()=>{
                    res.statusCode == 302
                    res.setHeader('Location', '/');
                    res.end();
                })
            })
        }else{
            if(url == '/read'){
                fs.readFile('./formValues.txt', (err, data)=>{
                    console.log(data.toString());
                    console.log(data.toString());
                    res.end(`
                            <h1>${data.toString()}</h1>
                        `);
                })
            }
        }
    }
})

server.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})