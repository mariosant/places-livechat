const monk = require("monk");

const { MONGODB_URL } = process.env;

const db = monk(MONGODB_URL);

const points = db.get("points", {
  castIds: true,
});

module.exports = {
  db,
  collections: {
    points,
  },
};
