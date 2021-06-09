import apollo from "apollo-server-express";
import typeDefs from "./type-defs.js";
import resolvers from "./resolvers.js";

const { ApolloServer } = apollo;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    settings: {
      ["request.credentials"]: "same-origin",
    },
  },
});

export default server;
