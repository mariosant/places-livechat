const validateAuth = require("./utils/validateAuth");
const { client, q } = require("./utils/db");

const fn = async (request, response) => {
  const [user, error] = await validateAuth(request);

  if (error) {
    return response.status(401).send("Unauthorized");
  }

  const query = q.Paginate(
    q.Match(q.Index("points_by_organization"), user.organization_id),
    {
      size: 100,
    }
  );

  const data = (await client.query(query)).data.map(([title, address]) => ({
    title,
    address,
  }));

  response.json({
    data,
  });
};

module.exports = fn;
