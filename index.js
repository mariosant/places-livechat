const express = require("express");
const apolloServer = require("./api/graphql/index.js");
const service = require("./api/express-service.js");

const port = process.env.PORT ?? 4000;

const start = async () => {
  await apolloServer.start();

  apolloServer.applyMiddleware({ app: service });
  service.listen({ port });

  console.log(`Listening at port ${port}`);
};

start();
