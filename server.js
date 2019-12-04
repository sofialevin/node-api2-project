const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.send(`<h2>Node API 2</h>`);
});

module.exports = server;