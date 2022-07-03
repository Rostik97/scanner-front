const http = require('http');

const hostname = '127.0.0.1';
const port = 8000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.end(JSON.stringify(
        [
            {id: 1, name: "duck", price: getRandom(1, 10)},
            {id: 2, name: "shit", price: getRandom(1, 100)}
        ]));
    console.log(req.headers)
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}