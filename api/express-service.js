const express = require("express");
const path = require("path");

const service = express();

const staticFilesMiddleware = express.static(path.join(__dirname, "../dist"));
const staticIndexMiddleware = express.static(
  path.join(__dirname, "../dist/index.html")
);

service.use(staticFilesMiddleware);
service.use("*", staticIndexMiddleware);

module.exports = service;
