const { gql } = require("graphql-request");

const validateAuth = require("./utils/validateAuth");
const mongoClient = require("./utils/mongoClient");

const fn = async (request, response) => {
  const [user, error] = await validateAuth(request);

  if (error) {
    return response.status(401).send("Unauthorized");
  }

  const query = gql`
  query {
    points(limit: 5, sortBy: CREATEDAT_DESC, query: {organization: "${user.organization_id}"}) {
      _id
      account
      address
      organization
      title
    }
  }
  `;

  const data = await mongoClient.request(query);

  response.json(data);
};

module.exports = fn;
