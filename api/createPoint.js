const validateAuth = require("./utils/validateAuth");
const { client, q } = require("./utils/db");

const fn = async (request, response) => {
  const [{ account_id: user, organization_id: organization }, error] =
    await validateAuth(request);

  if (error) {
    return response.status(401).send("Unauthorized");
  }

  const {
    body: { title, address },
  } = request;

  const poi = {
    title,
    address,
    organization,
    account: user,
  };

  const r = await client.query(q.Create(q.Collection("pois"), { data: poi }));

  response.json(poi);
};

module.exports = fn;
