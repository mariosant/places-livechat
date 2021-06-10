const typeDefs = `
    type Point {
        id: ID!
        title: String
        address: String
        createdAt: Int
    }

    type Query {
        points: [Point]
    }

    type Mutation {
        createPoint(title: String!, address: String!): Point

        deletePoint(id: ID!): Point
    }
`;

module.exports = typeDefs;
