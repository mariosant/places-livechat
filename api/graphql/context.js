const isEmpty = require("lodash/isEmpty");
const validateAuth = require("../utils/validateAuth.js");
const { db, collections } = require("../utils/mongoClient.js");
const createLivechatClient = require("../utils/lcApi");
const { customAlphabet } = require("nanoid");

const nanoid = customAlphabet("0123456789abcdef", 24);

const context = async ({ req }) => {
  const auth = await validateAuth(req).catch((err) => ({}));

  if (isEmpty(auth)) {
    return { authorized: false };
  }

  const lc = createLivechatClient({ token: auth?.access_token ?? "" });

  return {
    auth,
    db,
    collections,
    utils: {
      lc,
      nanoid,
    },
  };
};

module.exports = context;
