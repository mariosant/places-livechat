const typeDefs = `
    type Point {
        _id: ID!
        title: String
        address: String
        createdAt: String
    }

    type Query {
        points: [Point]
    }

    type Mutation {
        createPoint(title: String!, address: String!): Point

        deletePoint(_id: ID!): Point
    }
`;

module.exports = typeDefs;
