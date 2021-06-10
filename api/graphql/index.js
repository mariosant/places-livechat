const apollo = require("apollo-server-express");
const typeDefs = require("./type-defs.js");
const resolvers = require("./resolvers.js");

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

module.exports = server;
