const http = require('http');
const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const hostname = '127.0.0.1';
const port = 8000;

app.post("/upload", (req, res) => {
    const newpath = __dirname + "/files/";
    const file = req.files.file;
    const filename = file.name;
    console.log(file)
    file.mv(`/Users/rostikalekseev/Documents/work/my-app/public/test.jpg`, (err) => {
        if (err) {
            res.status(500).send({message: "File upload failed", code: 200});
        }
        res.status(200).send({message: "File Uploaded", code: 200});
    }).catch(err => {
        console.log(err)
    });
});
// const server = http.createServer((req, res) => {
//     console.log(req)
//
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'application/json');
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.end(JSON.stringify(
//         [
//             {id: 1, name: "duck", price: getRandom(1, 10)},
//             {id: 2, name: "shit", price: getRandom(1, 100)}
//         ]));
// });

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}