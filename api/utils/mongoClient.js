const { GraphQLClient } = require("graphql-request");

const { REALM_APP_ID, REALM_API_KEY } = process.env;

const endpoint = `https://eu-west-1.aws.realm.mongodb.com/api/client/v2.0/app/${REALM_APP_ID}/graphql`;

const client = new GraphQLClient(endpoint, {
  headers: {
    apiKey: REALM_API_KEY,
  },
});

module.exports = client;
