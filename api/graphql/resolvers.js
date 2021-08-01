const resolverRequiresAuth = require("../utils/resolverRequiresAuth");

const me = async (_parent, _args, { auth }) => {
  return {
    userId: auth.account_id,
    organization: auth.organization_id,
  };
};

const points = async (_parent, _args, { auth, collections }) => {
  const data = await collections.points.find(
    {
      organization: auth.organization_id,
    },
    {
      sort: { createdAt: -1 },
    }
  );

  return data;
};

const createPoint = async (
  _parent,
  { title, address },
  { auth, collections, utils }
) => {
  const point = {
    _id: utils.nanoid(),
    title,
    address,
    account: auth.account_id,
    organization: auth.organization_id,
    createdAt: Date.now(),
  };

  const data = await collections.points.insert(point);

  return data;
};

const updatePoint = async (_parent, { point }, { auth, collections }) => {
  const { _id, ...restProperties } = point;

  const updatedPoint = await collections.points.findOneAndUpdate(
    {
      _id,
      organization: auth.organization_id,
    },
    {
      $set: restProperties,
    }
  );

  return updatedPoint;
};

const deletePoint = async (_parent, { _id }, { auth, collections }) => {
  await collections.points.findOneAndDelete({
    _id,
    organization: auth.organization_id,
  });

  return { _id };
};

const resolvers = {
  Query: {
    me: resolverRequiresAuth(me),
    points: resolverRequiresAuth(points),
  },
  Mutation: {
    createPoint,
    updatePoint,
    deletePoint,
  },
};

module.exports = resolvers;
