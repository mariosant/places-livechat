const express = require("express");
const path = require("path");
const service = express();
const bodyParser = require("body-parser");

const { collections } = require("./utils/mongoClient");

const purchases = async (req, res) => {
  const { body } = req;
  const active = body.type === "ENABLE";

  await collections.purchases.findOneAndUpdate(
    {
      organization: body.organization,
      license: body.license,
    },
    {
      $set: {
        active,
        purchase: "pro-plan",
        organization: body.organization,
        license: body.license,
      },
    },
    {
      upsert: true,
    }
  );

  res.status(200).end();
};

service.post("/webhooks/in-app-upgrades", bodyParser.json(), purchases);

const staticFilesMiddleware = express.static(path.join(__dirname, "../dist"));
const staticIndexMiddleware = express.static(
  path.join(__dirname, "../dist/index.html")
);

service.use(staticFilesMiddleware);
service.use("*", staticIndexMiddleware);

module.exports = service;
