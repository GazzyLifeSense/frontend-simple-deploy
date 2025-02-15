const http = require("node:http");
const fs = require("fs");
const path = require("path");

// rootPath
const rootPath = path.join(__dirname, "dist");
const server = http.createServer((req, res) => {
  const url = path.join(rootPath, req.url);
  console.log(url);

  // route
  let resource;
  const resources = [
    url,
    path.join(url, "/index.html"),
    path.join(rootPath, "index.html"),
  ];

  // get resources
  for (let i = 0; i < resources.length; i++) {
    if (fs.existsSync(resources[i]) && !resources[i].endsWith("\\")) {
      resource = fs.readFileSync(resources[i]);
      break;
    }
  }
  return res.end(resource);
});
server.listen(3000, () => {
  console.log("Listening 3000");
});
