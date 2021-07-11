const { UserInputError } = require("apollo-server-express");

const resolverRequiresPro = (resolver) => (parent, args, context, info) => {
  const purchases = await context.collections.purchases.count({
    organization: context.auth.organization_id,
    active: true,
    purchase: "pro-plan",
  });

  if (purchases === 0) {
    throw new UserInputError("This requires a pro plan to be purchased.");
  }

  return resolver(parent, args, context, info);
};

module.exports = resolverRequiresPro;
