const validateAuth = require("../utils/validateAuth.js");
const { db, collections } = require("../utils/mongoClient.js");
const { customAlphabet } = require("nanoid");

const nanoid = customAlphabet("0123456789abcdef", 24);

const context = async ({ req }) => {
  const auth = await validateAuth(req);

  return {
    auth,
    db,
    collections,
    utils: {
      nanoid,
    },
  };
};

module.exports = context;
