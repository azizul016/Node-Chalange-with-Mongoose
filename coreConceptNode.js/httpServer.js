const http = require("http");
const fs = require("fs");
const path = require("path");
const server = http.createServer((req, res) => {
  //   console.log(req.url);
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("This is root directory");
  } else if (req.url === "/hello") {
    // const stream = fs.readFileSync(htmlPath, "utf8");
    // res.end(stream);

    /////////////////////////////////
    res.writeHead(200, { "Content-Type": "text/html" });
    const htmlPath = path.join(__dirname, "index.html");
    const stream = fs.createReadStream(htmlPath);
    stream.pipe(res);

    //////////////////////////
    // res.end("This is hello directory");

    ////////////////////////// ////////////

    // res.end(`<!DOCTYPE html>
    // <html lang="en">
    // <head>
    //     <meta charset="UTF-8">
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //     <title>Document</title>
    // </head>
    // <body>
    //     <h2>This is home directory</h2>
    // </body>
    // </html>`);
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Not found - This directory is not here");
  }
});

server.listen(3000, () => {
  console.log("Listening port is 3000");
});
