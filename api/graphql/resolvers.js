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

const deletePoint = async (_parent, { _id }, { auth, collections }) => {
  await collections.points.findOneAndDelete({
    _id,
    organization: auth.organization_id,
  });

  return { _id };
};

const resolvers = {
  Query: {
    points,
  },
  Mutation: {
    createPoint,
    deletePoint,
  },
};

module.exports = resolvers;
