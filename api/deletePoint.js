const { gql } = require("graphql-request");
const validateAuth = require("./utils/validateAuth");
const mongoClient = require("./utils/mongoClient");

const fn = async (request, response) => {
  const [user, error] = await validateAuth(request);

  if (error) {
    return response.status(401).send("Unauthorized");
  }

  const {
    body: { _id: pointId },
  } = request;

  const query = gql`
    mutation {
      deleteOnePoint(query: {_id: "${pointId}", organization: "${user.organization_id}" }) {
        _id
      }
    }
  `;

  await mongoClient.request(query);

  response.status(200).end();
};

module.exports = fn;
