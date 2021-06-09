const points = () => {
  console.log("gets in");

  return [
    {
      id: "lorem",
      title: "Title",
      address: "Skopelou 18",
      createdAt: Date.now(),
    },
  ];
};

const createPoint = () => {
  return {
    id: "lorem",
    title: "Title",
    address: "Skopelou 18",
    createdAt: Date.now(),
  };
};

const deletePoint = () => {};

const resolvers = {
  Query: {
    points,
  },
  Mutation: {
    createPoint,
    deletePoint,
  },
};

export default resolvers;
