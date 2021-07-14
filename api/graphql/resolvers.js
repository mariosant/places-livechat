const isNil = require("lodash/isNil");
const resolverRequiresAuth = require("../utils/resolverRequiresAuth");

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
  { title, address, groupId },
  { auth, collections, utils }
) => {
  const point = {
    _id: utils.nanoid(),
    title,
    address,
    groupId,
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

const group = async (parent, _args, { utils: { lc } }) => {
  if (isNil(parent.groupId)) {
    return;
  }

  const group = await lc.groupLoader.load(parent.groupId);

  return group ? { _id: group.id, name: group.name } : null;
};

const availableGroups = async (_parent, _args, { utils: { lc } }) => {
  const groups = await lc.client
    .post("/action/list_groups", {})
    .catch(() => []);

  const mappedGroups = groups.map((group) => ({
    _id: group.id,
    name: group.name,
  }));

  return mappedGroups;
};

const organization = async (_parent, _args, { auth, collections }) => {
  const purchaseObject = await collections.purchases.findOne({
    organization: auth.organization_id,
  });

  const data = {
    _id: auth.organization_id,
    proPlan: purchaseObject.purchase === "pro-plan",
  };

  return data;
};

const resolvers = {
  Query: {
    points: resolverRequiresAuth(points),
    availableGroups: resolverRequiresAuth(availableGroups),
    organization: resolverRequiresAuth(organization),
  },
  Mutation: {
    createPoint,
    updatePoint,
    deletePoint,
  },
  Point: {
    group,
  },
};

module.exports = resolvers;
