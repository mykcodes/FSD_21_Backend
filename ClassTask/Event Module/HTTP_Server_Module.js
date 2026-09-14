import http from 'http';

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/plain"
    });

    res.write('Hello World');
    {<br></br>}
    res.write("<h1>Welcome to my own server</h1>")
    res.end();
});

server.listen(8000, () => {
    console.log("Server is running on port 8000");
});