const { gql } = require("graphql-request");
const validateAuth = require("./utils/validateAuth");
const mongoClient = require("./utils/mongoClient");

const fn = async (request, response) => {
  const [{ account_id: user, organization_id: organization }, error] =
    await validateAuth(request);

  if (error) {
    return response.status(401).send("Unauthorized");
  }

  const {
    body: { title, address },
  } = request;

  const query = gql`
    mutation createPoint {
      insertOnePoint(data: {
        title: "${title}",
        address: "${address}",
        organization: "${organization}",
        account: "${user}",
        createdAt: "${new Date().toISOString()}"
      }) {
        _id,
        title,
        address,
        createdAt
      }
    }
  `;

  const { insertOnePoint: point } = await mongoClient.request(query);

  response.json(point);
};

module.exports = fn;
