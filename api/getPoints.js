const validateAuth = require("./utils/validateAuth");

const fn = async (request, response) => {
  const [user, error] = await validateAuth(request);

  if (error) {
    return response.status(401).send("Unauthorized");
  }

  console.log({ user });

  response.json({
    level: "a",
  });
};

module.exports = fn;
