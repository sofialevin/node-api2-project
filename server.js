const express = require("express");

const postsRouter = require("./posts-router.js");

const server = express();

server.get("/", (req, res) => {
  res.send(`<h2>Node API 2</h>`);
});

server.use("/api/posts", postsRouter);

module.exports = server;