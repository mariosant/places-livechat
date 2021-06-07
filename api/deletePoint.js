const validateAuth = require("./utils/validateAuth");
const { client, q } = require("./utils/db");

const fn = async (request, response) => {
  const [user, error] = await validateAuth(request);

  if (error) {
    return response.status(401).send("Unauthorized");
  }

  const {
    body: { id: pointId },
  } = request;

  const pointResult = await client.query(
    q.Get(q.Ref(q.Collection("points"), pointId))
  );

  if (pointResult.data.organization !== user.organization_id) {
    return response.status(404).send("Not found");
  }

  await client.query(q.Delete(pointResult.ref));

  response.status(200).end();
};

module.exports = fn;
