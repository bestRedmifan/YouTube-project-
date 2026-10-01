const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

const videos = [
  "dQw4w9WgXcQ",
  "9bZkp7q19f0",
  "kJQP7kiw5Fk",
  "3JZ_D3ELwOQ"
];

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8"
};

const server = http.createServer((req, res) => {
  if (req.url === "/api/random-video") {
    const id = videos[Math.floor(Math.random() * videos.length)];

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    });

    res.end(JSON.stringify({ id }));
    return;
  }

  let file = req.url === "/" ? "/index.html" : req.url;
  file = path.join(__dirname, file);

  if (!file.startsWith(__dirname) || !fs.existsSync(file)) {
    res.writeHead(404);
    res.end("Not Found");
    return;
  }

  const ext = path.extname(file);
  res.writeHead(200, {
    "Content-Type": types[ext] || "text/plain"
  });

  fs.createReadStream(file).pipe(res);
});

server.listen(PORT, () => {
  console.log(`Online you web running on port ${PORT}`);
});
