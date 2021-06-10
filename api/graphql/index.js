const apollo = require("apollo-server-express");
const typeDefs = require("./type-defs.js");
const resolvers = require("./resolvers.js");
const context = require("./context.js");

const { ApolloServer } = apollo;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  playground: {
    settings: {
      ["request.credentials"]: "same-origin",
    },
  },
});

module.exports = server;
