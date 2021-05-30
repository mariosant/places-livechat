const validateAuth = require("./utils/validateAuth");

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
    user,
    organization,
  };

  response.json(poi);
};

module.exports = fn;
