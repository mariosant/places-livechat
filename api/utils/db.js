const faunadb = require("faunadb");

const { FAUNADB_SECRET } = process.env;

const client = new faunadb.Client({
  secret: FAUNADB_SECRET,
});

module.exports = {
  ...faunadb,
  q: faunadb.query,
  client,
};
