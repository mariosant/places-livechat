import express from "express";
import apolloServer from "./api/graphql/index.js";

const port = process.env.port ?? 3000;

const app = express();

const start = async () => {
  await apolloServer.start();

  apolloServer.applyMiddleware({ app });
  app.listen({ port });

  console.log(`Listening at port ${port}`);
};

start();
