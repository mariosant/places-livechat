import { createClient, fetchExchange, dedupExchange } from "@urql/preact";
import { cacheExchange } from "@urql/exchange-graphcache";
import { devtoolsExchange } from "@urql/devtools";
import useAuth from "./useAuth";
import { points as pointsQuery } from "@/queries.js";

const graphExchange = cacheExchange({
  updates: {
    Mutation: {
      createPoint: (result, _args, cache) => {
        cache.updateQuery({ query: pointsQuery }, (data) => ({
          ...data,
          points: [result.createPoint, ...data.points],
        }));
      },
      deletePoint: (result, _args, cache) => {
        cache.updateQuery({ query: pointsQuery }, (data) => ({
          ...data,
          points: data.points.filter(
            ({ _id }) => _id !== result.deletePoint._id
          ),
        }));
      },
    },
  },

  optimistic: {
    createPoint: (vars) => ({
      __typename: "Point",
      _id: "temporary",
      title: vars.title,
      address: vars.address,
      group: null,
    }),
    deletePoint: (vars) => ({
      __typename: "Point",
      _id: vars._id,
    }),
    updatePoint: (vars, cache) => {
      const group = vars.point.groupId
        ? {
            __typename: "Group",
            _id: vars.point.groupId,
            name: cache.resolve(
              { __typename: "Group", _id: vars.point.groupId },
              "name"
            ),
          }
        : null;

      return {
        __typename: "Point",
        _id: vars.point._id,
        title: vars.point.title,
        address: vars.point.address,
        group,
      };
    },
  },
});

const client = createClient({
  url: "/graphql",
  requestPolicy: "cache-and-network",
  fetchOptions: () => {
    const { data } = useAuth.getState();

    return {
      headers: { authorization: `Bearer ${data?.access_token}` },
    };
  },
  exchanges: [devtoolsExchange, dedupExchange, graphExchange, fetchExchange],
});

export default client;
