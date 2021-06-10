const express = require("express");
const path = require("path");

const service = express();

const staticFilesMiddleware = express.static(path.join(__dirname, "../dist"));

service.use(staticFilesMiddleware);

module.exports = service;
