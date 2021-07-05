const { UserInputError } = require("apollo-server-express");

const resolverRequiresAuth = (resolver) => (parent, args, context, info) => {
  if (context.authorized === false) {
    throw new UserInputError("Resolver requires authentication");
  }

  return resolver(parent, args, context, info);
};

module.exports = resolverRequiresAuth;
